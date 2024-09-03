import { sql } from "@vercel/postgres";

const deleteBeer = async (beerId: number): Promise<boolean> => {
  try {
    const result = await sql`
      DELETE FROM beers WHERE id = ${beerId};
    `;

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default deleteBeer;
