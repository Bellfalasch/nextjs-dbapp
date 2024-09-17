import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    //DROP TABLE IF EXISTS users`;
    const result = await sql`
    CREATE TABLE users (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(255),
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
