import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import createBeer from "@/db/beers/add-one";
import React from "react";
import Link from "next/link";

const addBeer = async (formData: FormData) => {
  "use server"; // This runs on the server, so console.logs here and deeper will not be in the browser console ;P

  const castBeer = await createBeer(
    formData.get("name") as string,
    formData.get("description") as string,
    formData.get("brewery") as string,
    formData.get("alcohol") as string,
    formData.get("price") as string
  );

  console.log("Added beer", castBeer);
  
  revalidatePath("/beers");
  redirect(`/beers`);
};

export default function AddBeer() {
  return (
    <form
      action={addBeer}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className="title">Add a New Beer</h1>
      <div className="field">
        <label className="label">
          Name (required):
          <input name="name" type="text" required className="input" />
        </label>
      </div>
      <div className="field">
        <label className="label">
          Description:
          <input name="description" type="text" className="input" />
        </label>
      </div>
      <div className="field">
        <label className="label">
          Brewery:
          <input name="brewery" type="text" className="input" />
        </label>
      </div>
      <div className="field">
        <label className="label">
          Alcohol:
          <input name="alcohol" type="text" className="input" />
        </label>
      </div>
      <div className="field">
        <label className="label">
          Price:
          <input name="price" type="text" className="input" />
        </label>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Add beer
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
