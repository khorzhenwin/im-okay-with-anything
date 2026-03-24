# AGENTS.md

## Project overview
- App name: `im-okay-with-anything`
- Stack: Next.js 14, React 18, TypeScript, Mantine, Tailwind, Zustand, React Query, Firebase
- Routing uses the **Pages Router** under `src/pages`
- Package manager: `npm` (lockfile: `package-lock.json`)

## Common commands
- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Build production bundle: `npm run build`
- Start production server: `npm run start`
- Run lint: `npm run lint`

## Required environment variables
Create a local `.env` file when needed. The codebase references:

- `GOOGLE_AI_STUDIO_API_KEY`
- `GEOAPIFY_KEY`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`

Do not hardcode secrets in source files or commit `.env` contents.

## Repository structure
- `src/pages/`: page routes and API routes
  - `src/pages/api/`: server-side API handlers such as `food-finder`, `restaurant-finder`, and geocoding endpoints
  - `src/pages/session/[id]/index.tsx`: dynamic session route
- `src/components/`: reusable UI components grouped by feature (`forms`, `cards`, `modals`, `utils`, etc.)
- `src/features/Auth/`: auth-related providers, hooks, and query logic
- `src/stores/`: Zustand state stores
- `src/utils/`: shared helpers, types, modal helpers, seeded data, and error constants
- `src/layouts/`: layout wrappers
- `src/styles/`: global styles, Mantine theme, and CSS preflight
- `src/firebase/` plus root `firebase.js`: Firebase models, converters, repositories, and initialization
- `firestore/`: Firestore indexes and rules

## Architecture and conventions
- Use the `@/*` import alias for modules under `src`.
- Keep new routes in `src/pages`, not an `app/` directory.
- Pages may define custom static properties on the component:
  - `title`
  - `isPublic`
  - `getLayout`
- Global providers are composed in `src/components/utils/Provider.tsx`.
- Shared app shell and metadata are wired in `src/pages/_app.tsx`.
- Client state uses Zustand stores in `src/stores`.
- Remote/data-fetching concerns use React Query and the Axios client from `src/features/Auth/AxiosProvider.tsx`.
- Styling is a mix of Tailwind utility classes, Mantine components, and a small amount of SCSS/CSS modules.

## Editing guidance for agents
- Make focused changes that match the existing style in the touched file.
- Prefer updating the smallest relevant component, store, helper, or API route instead of introducing parallel abstractions.
- Reuse existing types from `src/utils/types` where possible before creating new ones.
- If you add a new API handler, follow the existing pattern in `src/pages/api/*`.
- If you add UI, check whether the feature already has an established folder under `src/components` before creating a new one.
- Preserve the Pages Router structure and existing `NextPageWithAttributes` page pattern.
- Avoid mixing unrelated refactors into task-driven edits.

## Validation expectations
- Run `npm run lint` after code changes when the task touches application code.
- For changes affecting runtime behavior, also run the narrowest practical manual verification or build command.
- If a change depends on external API keys, mention any verification limits caused by missing local secrets.

## Notes and risks
- This repo appears to rely on external services for Gemini, Geoapify, and Firebase-backed behavior. Expect some flows to be partially untestable without environment configuration.
- There is no dedicated test script in `package.json`, so linting is the default automated check unless you add test coverage as part of a task.
