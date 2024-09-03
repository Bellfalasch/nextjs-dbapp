import { sql } from "@vercel/postgres";
import DeleteBeer from "@/components/DeleteBeer";

async function Beers(): Promise<JSX.Element> {
  const { rows } =
    await sql`SELECT b.id, b.name, b.description, COUNT(v.*) AS votes, AVG(v.points_taste) AS taste, AVG(v.points_design) AS design, AVG(v.points_bonus) AS bonus FROM beers b LEFT OUTER JOIN votes v ON v.beer_id = b.id GROUP BY b.id ORDER BY b.id`;

return (
  <table>
    <thead>
      <th>ID</th>
      <th>Voting</th>
      <th>Name</th>
      <th>Description</th>
      <th>Votes</th>
      <th>Taste</th>
      <th>Design</th>
      <th>Bonus</th>
      <th>Delete</th>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td><button>Go vote!</button></td>
          <td>{row.name}</td>
          <td>{row.description}</td>
          <td>{row.votes}</td>
          <td>
            {row.taste ? parseFloat(row.taste.toString()).toFixed(1) : "-"}
          </td>
          <td>
            {row.design ? parseFloat(row.design.toString()).toFixed(1) : "-"}
          </td>
          <td>
            {row.bonus ? parseFloat(row.bonus.toString()).toFixed(1) : "-"}
          </td>
          <td><DeleteBeer beerId={row.id}/></td>
        </tr>
      ))}
    </tbody>
  </table>
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
