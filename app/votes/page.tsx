import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import addVote from "@/db/votes/vote";
import listBeers from "@/db/beers/get-all";
import { Beer } from "@/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

export default async function AddVote({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const allBeers = await getAllBeers();
  const { id: beerId } = await searchParams;
  const points = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];

  return (
    <form
      action={submitVote}
      className="form-panel vote-panel"
    >
      <div className="form-heading"><p className="eyebrow">Trust your palate</p><h1 className="title">Score this beer</h1><p>Choose a score for every category, then make it official.</p></div>
      <div className="field">
        <label htmlFor="fieldBeer" className="label">
          Beer
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
        <legend className="label">Taste <span>0–6 points</span></legend>
        {points.map((point) => (
          <label key={point}>
            <input name="taste" type="radio" required value={point} /> {point}{" "}
            points
          </label>
        ))}
      </fieldset>

      <fieldset className="radios">
        <legend className="label">Design <span>0–6 points</span></legend>
        {points.map((point) => (
          <label key={point}>
            <input name="design" type="radio" required value={point} /> {point}{" "}
            points
          </label>
        ))}
      </fieldset>

      <fieldset className="radios">
        <legend className="label">Festive bonus <span>0–3 points</span></legend>
        {points.map(
          (point) =>
            point <= 3 && (
              <label key={point}>
                <input name="bonus" type="radio" required value={point} />{" "}
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
        <div className="control">
          <Link href="/" className="button is-link is-light">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
