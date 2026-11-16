# HireLoop Client — AGENTS.md

This file contains repo-specific guidance for OpenCode agents. Read it before writing code.

## Developer Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start Next.js dev server (also: `next dev`) |
| `pnpm build` | Build Next.js production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm typecheck` | Run `tsc --noEmit` |

## Environment Variables

The following **must** be set in `.env` (see `.env` file for current values):

- `BETTER_AUTH_SECRET` — secret for better-auth sessions
- `BETTER_AUTH_URL` — base URL of the app (e.g. `http://localhost:3000`)
- `MONGODB_URI` — MongoDB connection string (Atlas or local)
- `BETTER_AUTH_GOOGLE_CLIENT_ID` / `BETTER_AUTH_GOOGLE_CLIENT_SECRET`
- `BETTER_AUTH_GITHUB_CLIENT_ID` / `BETTER_AUTH_GITHUB_CLIENT_SECRET`
- `NEXT_PUBLIC_API_BASE_URL` — external API base URL (default: `http://localhost:8000`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `STRIPE_SECRET_KEY` — Stripe secret key

**Missing any of these will cause runtime errors.** The app will fail to start or auth/payments will break.

## Architecture & Conventions

- **Framework**: Next.js 16 with app router (`app/` directory), React compiler enabled.
- **Entry points**:
  - `app/layout.tsx` — root layout with ThemeProvider, Toaster
  - `app/(public)/page.tsx` — public homepage (no auth required)
  - `app/(auth)/sign-in/page.tsx`, `app/(auth)/sign-up/page.tsx` — auth flows
  - `app/dashboard/...` — role-protected dashboards (seeker/recruiter/admin)
- **Routing**: `app/(public)/` = public, `app/(auth)/` = auth routes, `app/dashboard/` = internal
- **Role-based access**: Sidebar (DashboardSidebar.tsx) determines menu by `session.user.role` (seeker | recruiter | admin). Defaults to "seeker" if no role found.
- **Auth**: `better-auth` + MongoDB adapter. Session managed via `auth.api.getSession()` (see `lib/core/server.ts`).
- **API routes**:
  - `app/api/auth\[...all\]/route.ts` — better-auth callback handlers
  - `app/api/checkout_sessions/route.ts` — Stripe checkout session creation
- **Actions** (server functions): `lib/actions/*` — fetch external API via `BASE_URL` (default `http://localhost:8000`).
- **API clients** (minimal wrappers): `lib/api/*` — simple fetch wrappers around `BASE_URL`.
- **Stripe**: `lib/stripe.ts` — uses `server-only` import. Keys must be set in `.env`.
- **CSS**: Global `app/globals.css` imports Tailwind, tw-animate-css, and shadcn base. Custom theme variables defined at `:root` level. Components use `cn()` utility for class merging.
- **TypeScript**: `tsconfig.json` with `paths: { "@/*": ["./*"] }` — imports use `@/...` alias.
- **Component library**: shadcn/ui components are used throughout. See `components/ui/` for primitives.

## Role-Specific Flows

- **Seeker**: Can browse jobs, apply (may require premium if >2 applications), manage dashboard, view billing.
- **Recruiter**: Can create/manage jobs, view applications, dashboard.
- **Admin**: Full access — users, companies, jobs, payments, settings.

## Common Gotchas

1. **Auth env vars**: If Google/GitHub login doesn't work, check `BETTER_AUTH_GOOGLE_CLIENT_ID/SECRET` and `BETTER_AUTH_GITHUB_CLIENT_ID/SECRET` in `.env`.
2. **Stripe**: The price ID `price_1UbvN93QUIN76AIOoO7MY0Vs` is hardcoded in `app/api/checkout_sessions/route.ts`. Change if swapping plans.
3. **MongoDB connection**: `lib/auth.ts` creates a `MongoClient` from `MONGODB_URI`. The client is reused across requests (singleton pattern at module level). Do not create new clients in tests.
4. **`NEXT_PUBLIC_` prefix**: Only env vars with this prefix are available on the client. The app uses `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
5. **`server-only`**: `lib/stripe.ts` uses `import 'server-only'` — never import it on the client.
6. **Next.js compiler**: `nextConfig.ts` has `reactCompiler: true`. The `babel-plugin-react-compiler` devDependency is installed. Do not remove unless you know what you're doing.
7. **Base URL**: Many services use `process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"`. If the backend runs on a different port, update this.
8. **No test script**: `package.json` has no `test` script. If adding tests, configure a test runner (jest/vitest) and add the script.
9. **TypeScript strict mode**: `tsconfig.json` has `"strict": true`. Type errors will surface.
10. **ESLint global ignores**: `.next/`, `out/`, `build/` are ignored. Do not put dev builds in those dirs.

## Verification Order

When making changes, run in this order to catch issues early:

```
pnpm typecheck   # catches type errors
pnpm lint        # catches lint errors
pnpm format      # ensures formatting is consistent
pnpm build       # catches build-time errors
```

Then run any integration/verification steps specific to your change.