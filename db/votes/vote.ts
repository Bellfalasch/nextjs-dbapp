import { sql } from "@vercel/postgres";
import { Vote } from "@/types";

const addVote = async (
  user_id: number = 1,
  event_id: number = 1,
  beer_id: number,
  points_taste: number,
  points_design: number,
  points_bonus: number
): Promise<Vote | null> => {
  try {
    const result = await sql`
      INSERT INTO votes (user_id, event_id, beer_id, points_taste, points_design, points_bonus) VALUES (${user_id}, ${event_id}, ${beer_id}, ${points_taste}, ${points_design}, ${points_bonus}) RETURNING *
    `;

    // Return the newly inserted thing (logged on the server)
    console.log(result.rows[0]);
    return result.rows[0] as Vote;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default addVote;
