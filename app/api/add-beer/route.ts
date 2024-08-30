import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
/*
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const id = await createItem(data);
  res.status(200).json({ id });
}
  */

export async function createItem(beerName: string, beerDescription: string) {
  //const beerName = data.get("name");
  //const beerDescription = data.get("description");

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
