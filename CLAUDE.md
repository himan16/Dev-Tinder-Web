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
- Routes: `/login` and `/signup` (public); `/profile`, `/settings`, `/feeds`, `/connections` behind `RequireAuth`, which redirects to `/login`. Pages are heading-only placeholders in `src/pages/`.
- Auth: the logged-in user lives in the TanStack Query cache under `LOGGED_IN_USER_QUERY_KEY` (`['devTinder', 'loggedInUser']`, in `src/constant.js`); there is no auth Context and no `isLoggedIn` flag (logged in = a user exists). `useCurrentUser` (`GET /profile/view`, `staleTime` 5 min, `retry: false`) answers "who am I?" on load; `getProfile` returns `null` on 401 and throws on real failures. `RequireAuth` has three states: loading spinner, error, user (render `Outlet`) or no user (redirect to `/login`). Backend auth is a JWT in a `token` cookie set by `POST /login`.
- `useLogin` and `useSignup` seed `['devTinder', 'loggedInUser']` with `data.user` on success. `useLogout` calls `POST /logout`, removes the other cached queries and sets `['devTinder', 'loggedInUser']` to `null`. A global 401 rule in `src/queryClient.js` (`QueryCache` and `MutationCache` `onError`) sets `['devTinder', 'loggedInUser']` to `null`, so an expired cookie sends the user to `/login`.
- API layering: `src/services/` (plain fetch via `request.js`, which throws `ApiError` with a `status`) → `src/hooks/` (TanStack Query wrappers) → pages. `src/constant.js` holds global constants like `BASE_URL`, which is the relative `/devTinder`. In development the Vite proxy (`vite.config.js`) forwards `/devTinder/*` to `http://localhost:7777/*` with the prefix stripped. In production, nginx on the EC2 instance serves the `dist/` build and forwards `/devTinder/` to the backend on `127.0.0.1:7777` (with a trailing slash on `proxy_pass`, so the prefix is stripped), so the page and the API share an origin: no CORS and no port 7777 exposed.
- Login page (`src/pages/Login.jsx`): MUI form (email, password) using `useLogin`; it redirects to `/feeds` as soon as a user is in the cache. `NavBar` shows `UserMenu` (`src/components/UserMenu.jsx`): the avatar opens an MUI `Menu` with Profile (`/profile`), Settings (`/settings`, a heading-only placeholder) and Logout (`useLogout`).
- CORS: not needed by the frontend any more, because the Vite proxy (dev) and nginx (production) keep API calls same-origin. The backend's manual CORS middleware (allows `http://localhost:5173` with credentials) is only needed if the app calls the API cross-origin.
- The theme font is set to Lab Grotesque (a commercial font), but no font files are loaded yet, so it falls back to Helvetica or Arial.
- `public/` is empty, so the `favicon.svg` link in `index.html` 404s.
- Code is on GitHub at `himan16/Dev-Tinder-Web`.
- Signup page (`src/pages/Signup.jsx`, route `/signup`): built with React 19 form actions (`useActionState` + `<form action>`) instead of controlled inputs. The backend sets the session cookie on `POST /signup`, so `useSignup` seeds the cache like login. `ApiError` carries the backend's per-field `errors`, shown under each input. React resets uncontrolled fields after an action, so the action returns the submitted values (not the password) and the fields use them as `defaultValue`. A blank `lastName` is left out of the request (the backend rejects an empty string).
- Profile page (`src/pages/Profile.jsx`, `/profile`): a card that switches between `ProfileView` (avatar, name, age, gender, bio, skill chips, Edit button) and `ProfileEditForm`. The form uses React 19 form actions like Signup. Skills use an MUI `Autocomplete` (`multiple`, `freeSolo`, `autoSelect`) kept in state and sent as hidden `skills` inputs, read back with `formData.getAll('skills')`. The avatar is a URL field with a live preview (no uploads). `useUpdateProfile` (`PUT /profile/edit`) writes `data.updatedUser` into the logged-in-user cache, so the NavBar updates with no refetch. A cleared last name is sent as `null`, and a blank avatar URL is left out of the request.
- Feed (`src/pages/Feeds.jsx`, `/feeds`): one card at a time (`FeedCard`) with Pass and Like buttons. The backend's `GET /feed` excludes anyone you already have a request with, so **always request page 1** (`services/feed.js`); page numbers break because every swipe shrinks the list. `useFeed` refetches eagerly when 3 or fewer cards remain (`FEED_PREFETCH_THRESHOLD`), replaces the list instead of appending, stops after a batch smaller than `FEED_PAGE_SIZE` (`isLastBatch`), and waits while a swipe request is in flight (`useIsMutating`) so a just-swiped card can't come back. The feed query is deliberately never stale (`staleTime: Infinity`, no refetch on focus or mount): a refetch replaces the whole deck, so it only happens through the low-cards rule, never under someone who is mid-swipe. `useSendRequest` (`POST /request/send/:status/:userId`, `interested` = like, `ignored` = pass) updates the cache optimistically in `onMutate` and rolls back only that card in `onError`.
- Connections page (`src/pages/Connections.jsx`, `/connections`): two tabs, Requests (with a pending-count `Badge`) and Connections; the active tab is in the URL (`?tab=connections`, via `useSearchParams`). Both lists use wide rectangular cards: `RequestCard` (the sender's avatar, full name, age and gender, bio, skill chips, sent date, Accept and Reject buttons; it shows only the fields that exist) and the plain `ConnectionCard` (avatar and full name only). `useReceivedRequests` (`GET /requests/received`) and `useConnections` (`GET /connections`) are plain queries. `useReviewRequest` (`POST /request/review/:status/:requestId`, `accepted` or `rejected`) removes the row optimistically, invalidates `CONNECTIONS_QUERY_KEY` after an accept, rolls back only that row on error, and on a 404 (already reviewed) re-syncs instead of rolling back. The review mutation lives in `RequestsList`, not in each row, because a row unmounts as soon as it is removed.
- NavBar: the logo and title link to `/feeds`; `NavLinks` adds a Feed icon (`/feeds`) and a Connections icon (`/connections`) with a red `Badge` of pending requests, each with a tooltip and an active highlight (`NavLink`), before the `UserMenu`. `NavLinks` only mounts when a user exists, so the pending-requests query (shared with the Connections page) doesn't start during logout.
- Feedback: a global snackbar via `NotificationProvider` (`src/context/`, wired in `src/main.jsx`) and the `useNotify` hook, which returns `notify(message, severity)`. This is a Context use: UI-only state, rarely changing, needed on several pages. Accept shows a success message, reject an info message, and errors show the backend message (a 404 shows a warning).
- Redux was considered for the feed and deliberately not used: nothing in the buttons-only deck is client-only state. Revisit it for realtime notifications (unread badge, toast queue) or drag-gesture state.
- `GET /requests/received` populates `firstName lastName avtar bio skills email age` for the sender. `gender` is not in it yet, and `email` is returned but deliberately not shown.
- Backend issue for the owner to fix: `GET /feed` does not exclude the logged-in user, so users see their own card. (`/connections` populating `toUserId` was fixed by adding `ref: 'User'`.)
- Seed data: ten test users on the reserved `devtinder.test` domain exist in the shared Atlas database, each with a unique DiceBear avatar. Their credentials are not recorded in this repo; ask the owner. Created through `/signup` and `/profile/edit` by a script kept outside the repo.
- Planned: `/settings` gets change-password (`POST /profile/changePassword`); personal details stay on `/profile`.
- Backend validation (done): signup and `/profile/changePassword` enforce an 8 to 72 byte password; validation failures return 400 with `{ message, errors }`, a duplicate email returns 409, and the password hash is no longer serialized.
- Next: build the real pages (`/feeds`, `/connections`, `/profile`). Open backend items: the login cookie is still 60 seconds, the JWT secret is hard-coded, the cookie has no `httpOnly`/`sameSite`, and a wrong login returns 404.
