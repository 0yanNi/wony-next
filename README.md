# WONY Next

Vercel-ready Next.js + TypeScript + Tailwind + shadcn-structured application. Login/registration uses only username and password; the app maps usernames to private synthetic Auth emails internally, so players never need an email or social login.

## Included now
- Animated WebGL username/password login and registration
- Supabase Auth integration and route middleware
- New floral dashboard and profile
- Responsive app shell and navigation
- Inventory, Marketplace, Top Up, Tanam Coins, Quest, Event, Buy Role, Buy Assets, Redeem, Leaderboard, History, Have Fun, Notifications, and Admin UI routes
- Fresh PostgreSQL schema, RLS policies, and seed data
- Gacha and Growtopia server APIs intentionally postponed

## Supabase setup
1. Open Supabase → SQL Editor.
2. Run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Open Authentication → Providers → Email.
4. Enable Email provider and turn **Confirm email OFF**. This is required because players use username/password without real email addresses.
5. Copy Project URL and Publishable/anon key.

## Local environment
Copy `.env.example` to `.env.local` and fill:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_KEY
```
Never commit `SUPABASE_SERVICE_ROLE_KEY`.

## Run
```bash
npm install
npm run dev
```

## Vercel
Import the GitHub repository as a Next.js project. Add the same public Supabase variables under Settings → Environment Variables, then redeploy.

## Make an owner
Register an account in the app, then run this in Supabase SQL Editor:
```sql
update public.profiles set role='owner', verified=true where username='YOUR_USERNAME';
```

## UI paths
`components/ui` is the default shadcn component directory, configured in `components.json`. Shared application components live in `components/`, styles in `app/globals.css`, and routes in `app/`.
