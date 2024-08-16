import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventName = searchParams.get("name");
  const eventDescription = searchParams.get("description");

  try {
    if (!eventName || !eventDescription)
      throw new Error("Name and description are required");
    await sql`INSERT INTO events (name, description) VALUES (${eventName}, ${eventDescription});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const events = await sql`SELECT * FROM events;`;
  return NextResponse.json({ events }, { status: 200 });
}
