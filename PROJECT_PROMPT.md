# finplan — product brief

Build and maintain **finplan**, a calm Telegram-first personal-finance product for young adults who want to know where their money goes, stay within a monthly plan, save toward goals, and track investments without financial jargon or shame.

## Product promise

**Plan your money calmly.** The product is a record-keeping and education tool, not a broker and not personalised investment advice.

## What to build

- A Telegram bot for quick actions: add an expense by writing `120 coffee`, check a monthly summary, create goals, open the Mini App, and see a compact portfolio.
- A Telegram Mini App for the visual experience: dashboard, transaction history, goals, investment portfolio, and market search.
- An investments section where users may search securities supplied by a licensed data provider, save a watchlist, record buy/sell transactions, and see position quantity, cost basis, market value, and realised/unrealised P&L.
- Never claim that market coverage is universal or real-time unless the active data-provider contract guarantees it. Show source, timestamp, delayed/unavailable state, currency, and the educational disclaimer.

## Brand system

- Product name: `finplan` (always lowercase in product UI).
- Tone: clear, calm, direct, never shaming. Explain the consequence, not that a user is a failure.
- Background: `#F6F6F3`; ink: `#292D2A`; accent: `#829384`; surfaces: `#E8E9E4`; warning: `#C98272`.
- Use generous space, rounded cards, strong typography and one restrained accent. Avoid neon, stock-chart clichés, coins, crypto aesthetics and dark banking dashboards.
- Use the provided `outputs/finplan-logo.svg` and `outputs/finplan-icon.svg` as the initial visual direction.

## Engineering rules

- Validate Telegram Mini App `initData` server-side. Never trust client-provided user IDs.
- Keep Telegram and market-provider API tokens in environment variables only.
- Keep the market-data client replaceable. Do not scrape websites or expose provider keys to the Mini App.
- Use Decimal / database numeric values for money and persist every investment trade; never derive portfolio positions only in the browser.
- Keep the free core useful. Premium ideas must add insight or automation, not remove access to a user's own records.

