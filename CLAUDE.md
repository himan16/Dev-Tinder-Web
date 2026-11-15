# DevTinder Web

Personal project: the web frontend for DevTinder, a Tinder-style app for developers. The backend already exists in the sibling folder `../devTinder`. Check it for API routes, auth and data shapes before building features that call it, and don't guess them.

## Purpose and how to work with me

This project exists for **learning**: trying new technologies and libraries, and growing as a frontend engineer. Shipping fast is secondary.

- Treat architectural decisions as teaching moments. Propose options, recommend one, explain the trade-offs, and name the alternative you didn't pick.
- Push me. Prefer the approach that challenges me and teaches something over the easiest one, and push back when a decision of mine looks weak.
- Show the newer React way where there is one, and say which React version introduced it (for example `use()`, `useActionState`, `useFormStatus`, `useOptimistic`, ref-as-prop, the React Compiler).
- Explain the "why" behind new hooks, APIs and patterns as we use them, briefly and tied to the code at hand.
- Verify the current version and API of a library before using it. Your training data may be behind.

## Stack (decided, don't re-litigate)

- **Latest stable React** with **Vite**, plain **JavaScript** (`.jsx`). No TypeScript.
- **Material UI (latest)** for all UI components. **No Tailwind.**
  - Style with the `sx` prop, `styled()` from `@mui/material`, and the theme.
  - Emotion (`@emotion/react`, `@emotion/styled`) is MUI's required engine. Don't import it directly in app code.
  - Icons come from `@mui/icons-material`.
- **TanStack Query**, **Redux Toolkit** and **Context API** are all used on purpose, each with its own job:
  - **TanStack Query:** all server state (feed, matches, requests, profile). Don't copy server data into Redux or Context.
  - **Redux Toolkit:** client-only state with real logic, such as the swipe queue or multi-step UI flows. Use Redux Toolkit, not classic Redux.
  - **Context:** low-churn values like theme, current user and auth status.
  - If a piece of state doesn't clearly fit one of these, raise it instead of picking silently.
- **Routing: React Router** (v8, declarative mode: `<BrowserRouter>`, `<Routes>` and `<Route>` in `src/App.jsx`). Not the data-router API (`createBrowserRouter`).
- Linting uses **oxlint** (the Vite template default).
- Testing (Vitest and React Testing Library) is a topic to learn. Raise it when there is code worth testing.

## Commands

- `npm run dev`: dev server at `http://localhost:5173`
- `npm run build`: production build
- `npm run lint`: oxlint
- `npm run preview`: serve the production build

## Conventions

- Avoid boilerplate and abstractions unrelated to the current task. Adding a library is fine when it teaches something relevant to the goals above.
- Put the MUI theme and `CssBaseline` at the app root and keep design tokens (colors, typography, spacing) in the theme.
- Match the style of the surrounding code: no semicolons, single quotes, 2-space indent.
- TanStack Query keys always start with the `'devTinder'` namespace, for example `['devTinder', 'loggedInUser']`, `['devTinder', 'feed']`, `['devTinder', 'connections']`. Define shared keys as constants in `src/constant.js`. When comparing or filtering keys, compare the whole key (for example with `hashKey`), not just the first segment, since every key shares the first one.

## Git and GitHub

This is a **personal** project, not an office one. The machine's global git identity and the `gh` login are the office accounts, so never use them here.

- Remote: `origin` is `https://himan16@github.com/himan16/Dev-Tinder-Web.git` (personal account `himan16`). The `himan16@` in the URL makes the macOS keychain use a separate credential from the office one.
- Commit email: this repo's local `user.email` is `singhalhimanshu813@gmail.com`. Don't change it and don't commit with the office email.
- Pushing needs a `himan16` fine-grained personal access token stored in the keychain, and `gh` is logged in as the office account. So don't use `gh` for this repo. Pushing may need to be done by the user in their own terminal.
- Branch: `main`, tracking `origin/main`. Don't force-push.
- Commit messages start with `himan-devTinder-Web-<n>:` and a space, where `<n>` is the commit's serial number in this repo (the commit count after it, so `git rev-list --count HEAD` + 1 before committing). Commit 3 is the first to use the prefix, so commits 1 and 2 don't have it.
- Commit messages end with the `Co-Authored-By` line from the session's attribution instructions.

## Status

- Vite + React scaffolded. MUI v9 installed, with the theme in `src/theme.js` and `ThemeProvider` + `CssBaseline` in `src/main.jsx`.
- Basic `NavBar` and `Footer` in `src/components/`, wrapped by `AppLayout`.
- Routes: `/login` (public); `/profile`, `/feeds`, `/connections` behind `RequireAuth`, which redirects to `/login`. Pages are heading-only placeholders in `src/pages/`.
- Auth: the logged-in user lives in the TanStack Query cache under `LOGGED_IN_USER_QUERY_KEY` (`['devTinder', 'loggedInUser']`, in `src/constant.js`); there is no auth Context and no `isLoggedIn` flag (logged in = a user exists). `useCurrentUser` (`GET /profile/view`, `staleTime` 5 min, `retry: false`) answers "who am I?" on load; `getProfile` returns `null` on 401 and throws on real failures. `RequireAuth` has three states: loading spinner, error, user (render `Outlet`) or no user (redirect to `/login`). Backend auth is a JWT in a `token` cookie set by `POST /login`.
- `useLogin` and `useSignup` seed `['devTinder', 'loggedInUser']` with `data.user` on success. `useLogout` calls `POST /logout`, removes the other cached queries and sets `['devTinder', 'loggedInUser']` to `null`. A global 401 rule in `src/queryClient.js` (`QueryCache` and `MutationCache` `onError`) sets `['devTinder', 'loggedInUser']` to `null`, so an expired cookie sends the user to `/login`.
- API layering: `src/services/` (plain fetch via `request.js`, which throws `ApiError` with a `status`) → `src/hooks/` (TanStack Query wrappers) → pages. `src/constant.js` holds global constants like `BASE_URL` (`http://localhost:7777`).
- Login page (`src/pages/Login.jsx`): MUI form (email, password) using `useLogin`; it redirects to `/feeds` as soon as a user is in the cache. `NavBar` has a Logout button using `useLogout`.
- CORS: the backend has a manual CORS middleware that allows `http://localhost:5173` with credentials, so no Vite proxy is needed.
- The theme font is set to Lab Grotesque (a commercial font), but no font files are loaded yet, so it falls back to Helvetica or Arial.
- `public/` is empty, so the `favicon.svg` link in `index.html` 404s.
- Code is on GitHub at `himan16/Dev-Tinder-Web`.
- Signup page (`src/pages/Signup.jsx`, route `/signup`): built with React 19 form actions (`useActionState` + `<form action>`) instead of controlled inputs. The backend sets the session cookie on `POST /signup`, so `useSignup` seeds the cache like login. `ApiError` carries the backend's per-field `errors`, shown under each input. React resets uncontrolled fields after an action, so the action returns the submitted values (not the password) and the fields use them as `defaultValue`. A blank `lastName` is left out of the request (the backend rejects an empty string).
- Backend validation (done): signup and `/profile/changePassword` enforce an 8 to 72 byte password; validation failures return 400 with `{ message, errors }`, a duplicate email returns 409, and the password hash is no longer serialized.
- Next: build the real pages (`/feeds`, `/connections`, `/profile`). Open backend items: the login cookie is still 60 seconds, the JWT secret is hard-coded, the cookie has no `httpOnly`/`sameSite`, and a wrong login returns 404.
