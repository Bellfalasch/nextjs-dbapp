import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result =
      //await sql`CREATE TABLE events ( id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, description VARCHAR(255), PRIMARY KEY (id) );`;
      //await sql`ALTER TABLE events DROP COLUMN id;`;
      await sql`ALTER TABLE events ADD COLUMN id BIGSERIAL PRIMARY KEY;`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
