from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

import httpx

from .config import get_settings


class MarketDataUnavailable(Exception):
    pass


class MarketDataClient:
    ALIASES = {
        "BTC": "BTC-USD", "ETH": "ETH-USD", "SOL": "SOL-USD",
    }

    DISPLAY_NAMES = {}

    def provider_symbol(self, symbol: str) -> str:
        return self.ALIASES.get(symbol.strip().upper(), symbol.strip().upper())

    """Server-side market data adapter. Yahoo Finance is used as a broad fallback/provider."""

    async def _get_json(self, url: str, **params: str) -> dict[str, Any]:
        try:
            async with httpx.AsyncClient(timeout=12, headers={"User-Agent": "finplan/1.0"}) as client:
                response = await client.get(url, params=params)
                response.raise_for_status()
                return response.json()
        except (httpx.HTTPError, ValueError) as error:
            raise MarketDataUnavailable("Market data provider is temporarily unavailable") from error

    async def search(self, query: str) -> list[dict[str, Any]]:
        q = query.strip()
        q_upper = q.upper()
        special = []
        if q_upper in {"BTC", "BITCOIN"}:
            special.append({"symbol": "BTC-USD", "name": "Bitcoin USD", "type": "Crypto", "exchange": "Crypto"})
        if q_upper in {"ETH", "ETHEREUM"}:
            special.append({"symbol": "ETH-USD", "name": "Ethereum USD", "type": "Crypto", "exchange": "Crypto"})
        try:
            payload = await self._get_json("https://query1.finance.yahoo.com/v1/finance/search", q=q, quotesCount="16", newsCount="0")
            results = []
            for item in payload.get("quotes", []):
                symbol = item.get("symbol")
                if not symbol:
                    continue
                raw_type = item.get("quoteType") or item.get("typeDisp") or "Security"
                mapping = {"EQUITY": "Stock", "ETF": "ETF", "MUTUALFUND": "Mutual fund", "CRYPTOCURRENCY": "Crypto", "BOND": "Bond", "INDEX": "Index"}
                mapped_type = mapping.get(str(raw_type).upper(), raw_type.title() if isinstance(raw_type, str) else "Security")
                if mapped_type in {"Commodity", "Future"} or str(raw_type).upper() in {"FUTURE", "COMMODITY"}:
                    continue
                results.append({
                    "symbol": symbol,
                    "name": item.get("longname") or item.get("shortname") or symbol,
                    "type": mapping.get(str(raw_type).upper(), raw_type.title() if isinstance(raw_type, str) else "Security"),
                    "exchange": item.get("exchange") or item.get("exchDisp"),
                })
            merged = special + [x for x in results if x.get("symbol") not in {y.get("symbol") for y in special}]
            if merged:
                return merged[:16]
        except MarketDataUnavailable:
            pass

        token = get_settings().finnhub_api_key
        if token:
            try:
                async with httpx.AsyncClient(base_url="https://finnhub.io/api/v1", timeout=12) as client:
                    response = await client.get("/search", params={"q": query, "token": token})
                    response.raise_for_status()
                    payload = response.json()
                    return [{"symbol": x.get("symbol"), "name": x.get("description") or x.get("displaySymbol"), "type": x.get("type") or "Security"} for x in payload.get("result", [])[:16] if x.get("symbol")]
            except httpx.HTTPError:
                pass
        raise MarketDataUnavailable("No market instruments found right now")

    async def instrument(self, symbol: str) -> dict[str, Any]:
        display_symbol = symbol.strip().upper()
        symbol = self.provider_symbol(display_symbol)
        payload = await self._get_json(f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}", range="5d", interval="1d")
        result = (payload.get("chart", {}).get("result") or [None])[0]
        if not result:
            raise MarketDataUnavailable("No quote is available for this symbol")
        meta = result.get("meta", {})
        price = meta.get("regularMarketPrice") or meta.get("chartPreviousClose")
        if price is None:
            raise MarketDataUnavailable("No current price is available for this symbol")
        previous = meta.get("previousClose") or meta.get("chartPreviousClose") or price
        change = float(price) - float(previous)
        pct = (change / float(previous) * 100) if previous else 0
        return {
            "symbol": display_symbol,
            "name": self.DISPLAY_NAMES.get(display_symbol, (meta.get("longName") or meta.get("shortName") or display_symbol,))[0],
            "exchange": "Global" if display_symbol == "XAUUSD" else (meta.get("exchangeName") or meta.get("fullExchangeName")),
            "currency": meta.get("currency") or "USD",
            "country": None,
            "industry": None,
            "website": None,
            "price": price,
            "previous_close": previous,
            "change": change,
            "change_percent": pct,
            "as_of": datetime.now(timezone.utc).isoformat(),
            "source": "Yahoo Finance",
            "disclaimer": "Market data can be delayed. Coverage depends on the provider. Tracking only, not investment advice.",
        }

    async def history(self, symbol: str, range_name: str = "1mo") -> dict[str, Any]:
        allowed = {"1d": ("1d", "15m"), "1w": ("7d", "1h"), "1mo": ("1mo", "1d"), "3mo": ("3mo", "1d"), "1y": ("1y", "1wk"), "5y": ("5y", "1mo")}
        rng, interval = allowed.get(range_name, allowed["1mo"])
        display_symbol = symbol.strip().upper()
        provider_symbol = self.provider_symbol(display_symbol)
        payload = await self._get_json(f"https://query1.finance.yahoo.com/v8/finance/chart/{provider_symbol}", range=rng, interval=interval)
        result = (payload.get("chart", {}).get("result") or [None])[0]
        if not result:
            raise MarketDataUnavailable("No chart is available for this asset")
        meta = result.get("meta", {})
        timestamps = result.get("timestamp") or []
        closes = ((result.get("indicators", {}).get("quote") or [{}])[0]).get("close") or []
        points = [{"time": ts * 1000, "price": close} for ts, close in zip(timestamps, closes) if close is not None]
        return {"symbol": display_symbol, "currency": meta.get("currency") or "USD", "points": points}

    async def quote(self, symbol: str) -> dict[str, Any]:
        return await self.instrument(symbol)


# Backwards-compatible name used by the existing API.
FinnhubClient = MarketDataClient
