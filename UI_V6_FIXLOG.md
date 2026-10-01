# FINPLAN UI v13 — interaction repair

Fixed a regression introduced in the previous UI/graph rebuild.

## Fixed
- Removed a stale reference to a non-existent `#investment-currency` element that caused the app to throw during initial boot, leaving the interface loaded but non-interactive.
- Restored all form/button wiring from the last known-good build:
  - Add transaction
  - Expense/income switch
  - Quick categories
  - Goals create/edit/delete
  - Investment record
  - Settings
  - Theme and language controls
  - Activity filters
  - Instrument search and watchlist
  - Asset chart range buttons
  - Add to portfolio
  - Currency converter
- Kept the improved touch chart implementation and the existing approved visual style.

## Validation
- JavaScript syntax: `node --check static/app.js`
- Python syntax: `python -m py_compile app/*.py`
