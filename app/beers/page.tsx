import { sql } from "@vercel/postgres";

async function Beers(): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * FROM beers ORDER BY id`;

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
        <h1>Available beers</h1>
        <Beers />
    </main>
  );
}
