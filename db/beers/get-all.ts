import { Beer } from "@/types";
import { sql } from "@vercel/postgres";

const listBeers = async () => {
      try {
        const result = await sql`
        SELECT id, name, description, brewery, alcohol, price FROM beers ORDER BY id
        `;
    const beers = result.rows as Beer[];
    return beers;
  } catch (e) {
    console.error(e);
  }
};

export default listBeers;
