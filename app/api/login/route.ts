import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const result = await sql`
      SELECT id, username, password FROM users WHERE username = ${username};
    `;
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a session token or JWT here
      return NextResponse.json({ user: { id: user.id, username: user.username } }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}