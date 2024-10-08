import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE beers ( 
      id BIGSERIAL PRIMARY KEY, 
      name VARCHAR(255), 
      description VARCHAR(255),
      alcohol REAL,
      brewery VARCHAR(255),
      price INTEGER
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
