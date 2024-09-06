import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import addVote from "@/db/votes/vote";
import listBeers from "@/db/beers/get-all";
import { Beer } from "@/types";

const submitVote = async (formData: FormData) => {
    "use server"; // This runs on the server, so console.logs here and deeper will not be in the browser console ;P
    
    const castVote = await addVote(
      1,
      1,
      parseInt(formData.get("beer") as string, 10),
      parseFloat(formData.get("taste") as string),
      parseFloat(formData.get("design") as string),
      parseFloat(formData.get("bonus") as string)
    );
    
    console.log("Added vote", castVote);
    
    revalidatePath("/beers");
    redirect(`/beers`);
};

async function getAllBeers() {
  const beers = await listBeers();
  return !beers ? [] : beers;
}

export default async function AddVote({ searchParams }: { searchParams: URLSearchParams }) {
  const allBeers = await getAllBeers();
  // @ts-ignore
  const beerId = searchParams.id;
  const points = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];

  return (
    <form action={submitVote} className="flex flex-col place-items-baseline">
      <h1 className="text-xl mb-2">Add a Vote</h1>
      <label htmlFor="fieldBeer">Beer:</label>
      {beerId ? (
        <>
          <input type="hidden" name="beer" value={beerId} />
          <strong>{beerId}</strong>
        </>
      ) : (
        <select name="beer" id="fieldBeer">
          {allBeers?.map((beer: Beer) => (
            <option key={beer.id} value={beer.id}>
              {beer.name}
            </option>
          ))}
        </select>
      )}
      <fieldset>
        <legend>Points for taste (0-6):</legend>
        {points.map((point) => (
          <label key={point}>
            <input name="taste" type="radio" required value={point} /> {point}{" "}
            points
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Points for design (0-6):</legend>
        {points.map((point) => (
          <label key={point}>
            <input name="design" type="radio" required value={point} /> {point}{" "}
            points
          </label>
        ))}
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
