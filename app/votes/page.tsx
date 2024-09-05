import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import addVote from "@/db/votes/vote";
import listBeers from "@/db/beers/get-all";
import React from "react";
import { Beer } from "@/types";


const submitVote = async (formData: FormData) => {
    "use server"; // This runs on the server, so console.logs here and deeper will not be in the browser console ;P
    
    const castVote = await addVote(
        1,
        1,
        parseInt(formData.get("beer") as string, 10),
        parseInt(formData.get("taste") as string, 10),
        parseInt(formData.get("design") as string, 10),
        parseInt(formData.get("bonus") as string, 10)
    );
    
    console.log("Added vote", castVote);
    
    revalidatePath("/votes");
    redirect(`/votes`);
};

async function getAllBeers() {
  const beers = await listBeers();
  return !beers ? [] : beers;
}

export default async function AddVote() {
  const allBeers = await getAllBeers();

  return (
    <form action={submitVote} className="flex flex-col place-items-baseline">
      <h1 className="text-xl mb-2">Add a Vote</h1>
      <label htmlFor="fieldBeer">Beer:</label>
      <select name="beer" id="fieldBeer">
        {allBeers?.map((beer: Beer) => (
          <option key={beer.id} value={beer.id}>
            {beer.name}
          </option>
        ))}
      </select>

      <fieldset>
        <legend>Points for taste (0-6):</legend>
        <label>
          <input name="taste" type="radio" required value={0} /> 0 points
        </label>
        <label>
          <input name="taste" type="radio" required value={0.5} /> 0.5 points
        </label>
        <label>
          <input name="taste" type="radio" required value={1} /> 1 points
        </label>
        <label>
          <input name="taste" type="radio" required value={1.5} /> 1.5 points
        </label>
        <label>
          <input name="taste" type="radio" required value={2} /> 2 points
        </label>
        <label>
          <input name="taste" type="radio" required value={2.5} /> 2.5 points
        </label>
        <label>
          <input name="taste" type="radio" required value={3} /> 3 points
        </label>
        <label>
          <input name="taste" type="radio" required value={3.5} /> 3.5 points
        </label>
        <label>
          <input name="taste" type="radio" required value={4} /> 4 points
        </label>
        <label>
          <input name="taste" type="radio" required value={4.5} /> 4.5 points
        </label>
        <label>
          <input name="taste" type="radio" required value={5} /> 5 points
        </label>
        <label>
          <input name="taste" type="radio" required value={5.5} /> 5.5 points
        </label>
        <label>
          <input name="taste" type="radio" required value={6} /> 6 points
        </label>
      </fieldset>

      <fieldset>
        <legend>Points for design (0-6):</legend>
        <label>
          <input name="design" type="radio" required value={0} /> 0 points
        </label>
        <label>
          <input name="design" type="radio" required value={0.5} /> 0.5 points
        </label>
        <label>
          <input name="design" type="radio" required value={1} /> 1 points
        </label>
        <label>
          <input name="design" type="radio" required value={1.5} /> 1.5 points
        </label>
        <label>
          <input name="design" type="radio" required value={2} /> 2 points
        </label>
        <label>
          <input name="design" type="radio" required value={2.5} /> 2.5 points
        </label>
        <label>
          <input name="design" type="radio" required value={3} /> 3 points
        </label>
        <label>
          <input name="design" type="radio" required value={3.5} /> 3.5 points
        </label>
        <label>
          <input name="design" type="radio" required value={4} /> 4 points
        </label>
        <label>
          <input name="design" type="radio" required value={4.5} /> 4.5 points
        </label>
        <label>
          <input name="design" type="radio" required value={5} /> 5 points
        </label>
        <label>
          <input name="design" type="radio" required value={5.5} /> 5.5 points
        </label>
        <label>
          <input name="design" type="radio" required value={6} /> 6 points
        </label>
      </fieldset>

      <fieldset>
        <legend>Points for BONUS (0-3):</legend>
        <label>
          <input name="bonus" type="radio" required value={0} /> 0 points
        </label>
        <label>
          <input name="bonus" type="radio" required value={0.5} /> 0.5 points
        </label>
        <label>
          <input name="bonus" type="radio" required value={1} /> 1 points
        </label>
        <label>
          <input name="bonus" type="radio" required value={1.5} /> 1.5 points
        </label>
        <label>
          <input name="bonus" type="radio" required value={2} /> 2 points
        </label>
        <label>
          <input name="bonus" type="radio" required value={2.5} /> 2.5 points
        </label>
        <label>
          <input name="bonus" type="radio" required value={3} /> 3 points
        </label>
      </fieldset>

      <button type="submit">Add vote</button>
    </form>
  );
}
