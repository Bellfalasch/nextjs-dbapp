import DatabaseSetupNotice from "@/components/DatabaseSetupNotice";
import { hasDatabaseConnectionString, legacySql as sql } from "@/db/legacy";

export const dynamic = "force-dynamic";

async function Events() {
  if (!hasDatabaseConnectionString()) {
    return <DatabaseSetupNotice />;
  }

  const { rows } = await sql`SELECT * FROM events ORDER BY id`;

  return (
    <ul className="event-list">
      {rows.map((row) => (
        <li key={row.id}>
          <span className="event-number">{String(row.id).padStart(2, "0")}</span>
          <span><strong>{row.name}</strong><small>{row.description}</small></span>
        </li>
      ))}
    </ul>
  );
}
export default function Home() {
  return (
    <main className="page-shell">
      <div className="page-heading"><div><p className="eyebrow">Gather around</p><h1 className="title">Tasting events</h1></div></div>
      <Events />
    </main>
  );
}
