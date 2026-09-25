# Academia de Espanol Rico

Next.js application deployed to Cloudflare Workers through OpenNext, with Cloudflare D1 persistence managed by Drizzle ORM.

## Local development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The local Next.js server can access simulated Cloudflare bindings because `next.config.ts` initializes OpenNext's local platform integration.

## Cloudflare D1 setup

1. Create a D1 database:

	```bash
	npx wrangler d1 create language-tutor-site-db
	```

2. Copy the returned database ID into `wrangler.jsonc`, replacing `REPLACE_WITH_D1_DATABASE_ID`.
3. Regenerate the Cloudflare binding types:

	```bash
	npm run cf-typegen
	```

4. Generate migrations after changing `lib/db/schema.ts`:

	```bash
	npm run db:generate
	```

5. Apply migrations locally:

	```bash
	npm run db:migrate:local
	```

6. Apply migrations remotely only after reviewing them:

	```bash
	npm run db:migrate:remote
	```

The application accesses D1 through the `DB` binding in `lib/db/index.ts`. Application queries use Drizzle ORM; Drizzle Kit generates the SQL migrations that Wrangler applies.

## Cloudflare preview and deployment

```bash
npm run preview
npm run deploy
```

Required runtime secrets such as Clerk and Plunk credentials must be configured in Cloudflare separately. Do not commit `.env.local`, `.dev.vars`, or secret values.

## Validation

```bash
npm run lint
npm run build
```
