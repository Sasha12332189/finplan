# FinPlan UI V14

## Main fixes
- Reworked the light theme so it has the same layered Liquid Glass depth as dark mode: warm/mint gradients, translucent surfaces, stronger hierarchy, and consistent brand lighting.
- Added an explicit **Hide keyboard / Скрыть клавиатуру** control that appears while text/numeric inputs are focused.
- Removed the repeated `Telegram.WebApp.expand()` call from `viewportChanged`; it was a major source of iOS keyboard open/close viewport jumps.
- Disabled smooth scroll for navigation changes and keyboard mode, and stopped view/sheet animations while the iOS viewport is resizing.
- The investment search is now placed near the top of the Investments screen.
- Added focus handling for the investment search so the field is brought into a stable visible area when the keyboard opens.
- Search results now use a request sequence guard so an older API response cannot overwrite a newer query while typing/scrolling.
- Replaced the search magnifier CSS pseudo-element with a real SVG icon so its orientation is deterministic.

## Investment capital model
- Added **Investment capital** as a separate reserve linked to the main FinPlan balance.
- Users can move money from the main balance into investment capital without creating a spending transaction.
- Users can return only free investment capital back to the main balance.
- The main Plan balance is reduced by the allocated investment capital.
- For BUY trades in the account currency, allocated capital is enforced as the available cash limit.
- Existing users remain compatible: when investment capital is `0`, existing investment trade behavior is preserved.
- Added a SQLite migration for the new `users.investment_capital` column.

## Verification
- `node --check static/app.v14.js` passes.
- Python application files compile with `python -m compileall`.
- HTML parses successfully.
- CSS brace balance is valid.
- Full pytest collection is blocked in the current environment because `aiosqlite` is not installed; tests were not claimed as passed.
