import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password, name } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await sql`
      INSERT INTO users (username, password, name) VALUES (${username}, ${hashedPassword}, ${username}) RETURNING id, username, name;
    `;
    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}