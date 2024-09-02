import { sql } from "@vercel/postgres";

async function Events({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * FROM events ORDER BY id`; //WHERE user_id = ${params.user}`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.name} - {row.description}
        </div>
      ))}
    </div>
  );
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Available events</h1>
      <Events params={{ user: "test" }} />
    </main>
  );
}
