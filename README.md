# React Quiz App (React + TypeScript + Vite)

A small quiz application built with React 19, TypeScript, and Vite. Questions are fetched from a configurable API (supports both `my-json-server` and local `json-server`).

### Features

- React 19 + TypeScript + Vite
- Global quiz state via `useReducer`
- Timed quiz with a countdown timer
- High score persisted in `localStorage`
- Strict ESLint + TypeScript settings

## Getting Started

### 1) Clone and install

```bash
git clone <repo-url>
cd react-quiz-app
npm ci
```

### 2) Configure environment

This app reads the API base URL from `VITE_API_BASE_URL`. Create an `.env` file at the project root. Example values below:

```bash
# .env
# Remote (my-json-server)
VITE_API_BASE_URL=https://my-json-server.typicode.com/<your-username>/<your-repo>

# OR local (json-server)
# VITE_API_BASE_URL=http://localhost:8000
```

Notes:

- The app will throw a clear error at runtime if `VITE_API_BASE_URL` is missing.
- Do not commit secrets; `.env` should be git-ignored.

### 3) Start the app

```bash
npm run dev
```

Open `http://localhost:5173`.

## Data Source Options

You can host the `db.json` in two ways:

### Option A: my-json-server (remote, read-only)

1. Push your `db.json` to a public GitHub repo.
2. Set `VITE_API_BASE_URL` to:
   - `https://my-json-server.typicode.com/<your-username>/<your-repo>`
3. The app will fetch from `<baseUrl>/questions`.

### Option B: Local json-server

1. Run the included script to serve `db.json` locally:

```bash
npm run server
```

2. Set `VITE_API_BASE_URL` to `http://localhost:8000`.
3. The app will fetch from `http://localhost:8000/questions`.

## Available Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Type-check and build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint
- `npm run server`: Start `json-server` at `http://localhost:8000` serving `db.json`

## Project Structure

- `src/App.tsx`: App shell and screen routing by quiz status
- `src/reducers/quiz.reducer.ts`: Quiz state machine and actions
- `src/components/*`: UI components (question, progress, timer, finish screen, etc.)
- `src/services/index.ts`: API client using `VITE_API_BASE_URL`
- `db.json`: Questions dataset (used by `json-server` or my-json-server)

## Environment & Security

- Uses `.env` for runtime configuration; never hardcode secrets.
- `VITE_API_BASE_URL` is validated at startup to avoid silent misconfiguration.

## Accessibility

- Semantic HTML elements and keyboard-friendly buttons.
- Consider running Lighthouse or axe-core audits during development.

## Notes

- Tested with Node 20+.
- If you change the dataset shape, update `src/types/index.ts` accordingly.
