import DatabaseSetupNotice from "@/components/DatabaseSetupNotice";
import { hasDatabaseConnectionString, legacySql as sql } from "@/db/legacy";

export const dynamic = "force-dynamic";

async function Events() {
  if (!hasDatabaseConnectionString()) {
    return <DatabaseSetupNotice />;
  }

  const { rows } = await sql`SELECT * FROM events ORDER BY id`;

  return (
    <ul>
      {rows.map((row) => (
        <li key={row.id}>
          {row.id} - {row.name} - {row.description}
        </li>
      ))}
    </ul>
  );
}
export default function Home() {
  return (
    <main className="content">
      <h1 className="title">Available events</h1>
      <Events />
    </main>
  );
}
