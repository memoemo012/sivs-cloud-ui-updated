# TriGuard SQLite Deploy Steps (Mac + VS Code)

1. Open this folder in VS Code.
2. Run `npm install`.
3. Run `npm run init-db`.
4. Run `npm start` and test `http://localhost:3000`.
5. Create `.env` only if you need local overrides.
6. Push to GitHub using:
   - `git init`
   - `git branch -M main`
   - `git remote add origin https://github.com/memoemo012/sivs-cloud-ui-updated.git`
   - `git add .`
   - `git commit -m "Deploy SQLite TriGuard site"`
   - `git push -u origin main --force`
7. On Render:
   - Build Command: `npm install`
   - Start Command: `npm run init-db && npm start`
