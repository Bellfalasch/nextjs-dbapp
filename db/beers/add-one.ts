import { sql } from "@vercel/postgres";
import { Beer } from "@/types";

const createBeer = async (
  name: string,
  description: string
): Promise<Beer | null> => {
  try {
    const result = await sql`
      INSERT INTO beers (name, description) VALUES (${name}, ${description}) RETURNING *
    `;

    // Return the newly inserted thing (logged on the server)
    console.log(result.rows[0]);
    return result.rows[0] as Beer;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default createBeer;
