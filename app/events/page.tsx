import { sql } from "@vercel/postgres";

async function Events({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * FROM events ORDER BY id`; //WHERE user_id = ${params.user}`;

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
      <Events params={{ user: "test" }} />
    </main>
  );
}
