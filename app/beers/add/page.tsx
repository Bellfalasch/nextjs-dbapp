import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import createBeer from "@/db/beers/add-one";
import React from "react";

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
    <form action={addBeer}>
      <h1 className="text-xl mb-2">Add a New Beer</h1>
      <label>
        Name (required):
        <input name="name" type="text" required />
      </label>
      <label>
        Description:
        <input name="description" type="text" />
      </label>
      <label>
        Brewery:
        <input name="brewery" type="text" />
      </label>
      <label>
        Alcohol:
        <input name="alcohol" type="text" />
      </label>
      <label>
        Price:
        <input name="price" type="text" />
      </label>
      <button type="submit">Add beer</button>
    </form>
  );
}
