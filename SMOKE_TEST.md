# Windows smoke test

After `START_FINPLAN.bat` prints `Public API health OK`, the following should work in a browser:

- `https://<temporary-url>/health` → `{"status":"ok"}`
- `https://<temporary-url>/` → finplan interface

Do not open `/` directly and expect user data to load: Telegram `initData` is required outside development mode.
