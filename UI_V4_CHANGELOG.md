# FINPLAN UI V4 / Investment UX

## Investment improvements
- Added XAUUSD / Gold as a first-class searchable asset alias.
- Yahoo Finance search now maps stocks, ETFs, mutual funds, bonds, crypto, futures/commodities and indexes into clearer asset types.
- Provider symbol aliases support XAUUSD, BTC, ETH and SOL.
- Portfolio totals are converted into the user's account currency when FX data is available.
- Trade entry now supports **By amount** or **By units**. Amount mode derives units from purchase amount / price.
- Added Commodity and Index asset types.

## Currency converter
- Last base/quote currencies persist in localStorage.
- Last entered amount also persists.
- Swap preserves the selected pair.

## Telegram-style visual layer
- Uses Telegram theme CSS variables (`--tg-theme-*`) instead of a fixed custom palette.
- Selective glass/blur is applied to the top bar, cards, sheets and bottom navigation.
- Added Telegram-like press feedback and spring-ish sheet transitions.
- Safe-area and reduced-motion behavior retained.

## Validation
- Python syntax checks pass.
- JavaScript syntax check passes.
- Existing unittest suite could not run in the build environment because `aiosqlite` is not installed; this does not indicate a test failure in the project code itself.
