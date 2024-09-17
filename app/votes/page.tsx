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
    <form
      action={submitVote}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className="title">Add a Vote</h1>
      <div className="field">
        <label htmlFor="fieldBeer" className="label">
          Beer:
        </label>
        {beerId ? (
          <>
            <input type="hidden" name="beer" value={beerId} />
            <strong>{beerId}</strong>
          </>
        ) : (
          <div className="select">
            <select name="beer" id="fieldBeer">
              {allBeers?.map((beer: Beer) => (
                <option key={beer.id} value={beer.id}>
                  {beer.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <fieldset className="radios">
        <legend className="label">Points for taste (0-6):</legend>
        {points.map((point) => (
          <label key={point}>
            <input name="taste" type="radio" required value={point} /> {point}{" "}
            points
          </label>
        ))}
      </fieldset>

      <fieldset className="radios">
        <legend className="label">Points for design (0-6):</legend>
        {points.map((point) => (
          <label key={point}>
            <input name="design" type="radio" required value={point} /> {point}{" "}
            points
          </label>
        ))}
      </fieldset>

      <fieldset className="radios">
        <legend className="label">Points for BONUS (0-3):</legend>
        {points.map(
          (point) =>
            point <= 3 && (
              <label key={point}>
                <input name="design" type="radio" required value={point} />{" "}
                {point} points
              </label>
            )
        )}
      </fieldset>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Cast your vote
          </button>
        </div>
      </div>
    </form>
  );
}
