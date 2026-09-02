# X-mas Beer App

A private, organizer-led Christmas beer tasting app built with Next.js.

## Getting Started

Install [Bun 1.4 or newer](https://bun.sh/) and restore the locked dependencies:

```bash
bun install --frozen-lockfile
```

Create `.env.local` from `.env.example`, then start the development server:

```bash
cp .env.example .env.local
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database Setup

The beer, event, and voting pages require a PostgreSQL connection string in
`.env.local`:

```dotenv
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

If the database is managed through an existing Vercel project, link the local
workspace and pull its development variables instead of entering the connection
string manually:

```bash
bunx vercel link
bunx vercel env pull .env.local
```

Restart `bun run dev` after changing environment variables. Legacy SQL pages
also accept `POSTGRES_URL` during the migration to the new data layer.

## Commands

```bash
bun run build
bun run lint
bun run typecheck
bun run test
bun run test:e2e
bun run db:generate
bun run db:migrate
bun run db:studio
```

Use `bun add <package>` or `bun add --dev <package>` when changing dependencies, and commit the resulting `bun.lock` update.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

The app targets [Vercel](https://vercel.com/). Vercel detects `bun.lock` and uses Bun to install dependencies while Next.js routes continue to run on the supported Node.js runtime.

Configure the variables documented in `.env.example` before deploying.
