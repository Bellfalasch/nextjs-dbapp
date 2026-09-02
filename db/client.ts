import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { getServerEnv } from "@/lib/env";
import * as schema from "@/db/schema";

function createDatabase() {
  const client = neon(getServerEnv().DATABASE_URL);
  return drizzle(client, { schema });
}

export type Database = ReturnType<typeof createDatabase>;

let database: Database | undefined;

export function getDatabase(): Database {
  database ??= createDatabase();
  return database;
}