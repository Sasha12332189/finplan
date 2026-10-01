# FINPLAN UI V3

## What changed
- Reworked Mini App interaction states and added smoother Telegram/iOS-style glass UI transitions.
- Added a dedicated currency converter utility in the top bar with swap, amount input, current rate, and result.
- Rebuilt Investments around asset detail pages: broad Yahoo Finance search, quote details, chart ranges, watchlist, and one-tap portfolio entry.
- Portfolio now requests current quotes and calculates current value and unrealised P/L when market data is available; it refreshes while the Invest screen is open.
- Added server-side market history and FX conversion endpoints. Provider credentials remain server-side.
- Expanded market search beyond the previous Finnhub-only stock search; Yahoo search covers equities, ETFs, funds and crypto, with Finnhub fallback if configured.
- Improved bot quick-entry parsing: `120 coffee` records an expense, `+500 salary` records income. `/summary` now includes the configured opening balance.
- Preserved existing Telegram auth, SQLite persistence, Windows/ngrok launcher, goals, activity and settings.
- Added reduced-motion handling and safe-area/mobile responsiveness.

## Notes
- Market coverage and live quotes depend on the public/provider availability and can be delayed.
- Bond coverage varies by provider and symbol; unsupported instruments return a clear unavailable state instead of breaking the app.
