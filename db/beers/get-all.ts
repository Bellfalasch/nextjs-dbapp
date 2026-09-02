import { Beer } from "@/types";
import { legacySql as sql } from "@/db/legacy";

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
