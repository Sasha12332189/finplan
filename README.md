# FINPLAN

Telegram Mini App + bot for personal finance tracking.

## Windows

Run `START_FINPLAN.bat`. The launcher starts the API, creates an HTTPS ngrok endpoint, updates `PUBLIC_APP_URL`, and starts the Telegram bot.

On the first run, ngrok asks for an authtoken. You may paste either the raw token or the full `ngrok config add-authtoken ...` command. Keep the token private.

## UI v2

The Mini App now includes:
- iOS-inspired light/dark/system appearance
- Ukrainian, Russian and English localization
- device-local time greeting
- European and major international currencies
- editable starting account balance and monthly budget
- quick transaction categories
- transaction deletion and goal progress editing
- watchlist add/remove and investment ledger
- responsive Telegram safe-area layout

See `UI_V2_CHANGELOG.md` for the detailed changes.
