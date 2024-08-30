import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const beerName = searchParams.get("name");
  const beerDescription = searchParams.get("description");

  try {
    if (!beerName || !beerDescription)
      throw new Error("Name and description are required");
    await sql`INSERT INTO beers (name, description) VALUES (${beerName}, ${beerDescription});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const events = await sql`SELECT * FROM beers;`;
  return NextResponse.json({ events }, { status: 200 });
}
