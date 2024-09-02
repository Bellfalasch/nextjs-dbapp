import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE votes (
        id BIGSERIAL PRIMARY KEY,
        user_id INTEGER,
        event_id INTEGER,
        beer_id INTEGER,
        points_taste INTEGER,
        points_design INTEGER,
        points_bonus INTEGER,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
          REFERENCES users (id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_event
          FOREIGN KEY(event_id)
          REFERENCES events (id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_beer
          FOREIGN KEY(beer_id)
          REFERENCES beers (id)
          ON DELETE RESTRICT
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
