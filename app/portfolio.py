from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass
from decimal import Decimal
from typing import Iterable

from .models import InvestmentTransaction


ZERO = Decimal("0")


@dataclass
class Position:
    symbol: str
    name: str
    asset_type: str
    currency: str
    quantity: Decimal = ZERO
    average_cost: Decimal = ZERO
    realised_pnl: Decimal = ZERO

    @property
    def cost_basis(self) -> Decimal:
        return self.quantity * self.average_cost


def build_positions(transactions: Iterable[InvestmentTransaction]) -> list[Position]:
    """Weighted-average cost basis. Sells cannot make a position negative."""
    positions: dict[tuple[str, str], Position] = {}
    for trade in sorted(transactions, key=lambda item: (item.occurred_at, item.id or 0)):
        key = (trade.symbol.upper(), trade.currency.upper())
        position = positions.setdefault(
            key,
            Position(
                symbol=trade.symbol.upper(),
                name=trade.instrument_name,
                asset_type=trade.asset_type,
                currency=trade.currency.upper(),
            ),
        )
        quantity = Decimal(trade.quantity)
        price = Decimal(trade.price)
        fee = Decimal(trade.fee)
        if trade.side == "BUY":
            total_cost = position.cost_basis + (quantity * price) + fee
            position.quantity += quantity
            position.average_cost = total_cost / position.quantity
        else:
            if quantity > position.quantity:
                raise ValueError(f"Cannot sell {quantity} {position.symbol}; only {position.quantity} recorded")
            proceeds = (quantity * price) - fee
            position.realised_pnl += proceeds - (quantity * position.average_cost)
            position.quantity -= quantity
            if position.quantity == ZERO:
                position.average_cost = ZERO
    return list(positions.values())


def totals_by_currency(positions: Iterable[Position]) -> dict[str, dict[str, Decimal]]:
    totals: dict[str, dict[str, Decimal]] = defaultdict(lambda: {"cost_basis": ZERO, "realised_pnl": ZERO})
    for position in positions:
        totals[position.currency]["cost_basis"] += position.cost_basis
        totals[position.currency]["realised_pnl"] += position.realised_pnl
    return dict(totals)
