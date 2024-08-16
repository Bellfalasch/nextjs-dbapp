import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`DROP TABLE IF EXISTS votes;
      CREATE TABLE votes (
        id BIGSERIAL PRIMARY KEY,
        user_id INT,
        event_id INT,
        beer_id INT,
        points_taste INT,
        points_design INT,
        points_bonus INT,
        CONSTRAINTS fk_user
          FOREIGN KEY(user_id)
          REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINTS fk_event
          FOREIGN KEY(event_id)
          REFERENCES events(id)
          ON DELETE CASCADE,
        CONSTRAINTS fk_beer
          FOREIGN KEY(beer_id)
          REFERENCES beers(id)
          ON DELETE CASCADE
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
