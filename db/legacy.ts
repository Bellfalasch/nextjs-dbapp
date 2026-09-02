import {
  createPool,
  type QueryResult,
  type QueryResultRow,
  type VercelPool,
} from "@vercel/postgres";

type SqlValue = string | number | boolean | null | undefined;

let pool: VercelPool | undefined;

export function hasDatabaseConnectionString(): boolean {
  return Boolean(process.env.DATABASE_URL ?? process.env.POSTGRES_URL);
}

function getPool(): VercelPool {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error(
      "Database is not configured. Set DATABASE_URL in .env.local and restart the development server.",
    );
  }

  pool ??= createPool({ connectionString });
  return pool;
}

export function legacySql<Row extends QueryResultRow>(
  strings: TemplateStringsArray,
  ...values: SqlValue[]
): Promise<QueryResult<Row>> {
  return getPool().sql<Row>(strings, ...values);
}