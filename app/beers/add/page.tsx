import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import createBeer from "@/db/beers/add-one";
import React from "react";

const addBeer = async (formData: FormData) => {
  "use server"; // This runs on the server, so console.logs here and deeper will not be in the browser console ;P

  const castBeer = await createBeer(
    formData.get("name") as string,
    formData.get("description") as string
  );

  console.log("Added beer", castBeer);
  
  //revalidatePath("/beers/add");
  //redirect(`/beers/add`);
};

export default function AddBeer() {
  return (
    <form action={addBeer} className="flex flex-col place-items-baseline">
      <h1 className="text-xl mb-2">Add a New Beer</h1>
      <label>
        Name:
        <input name="name" type="text" required />
      </label>
      <label>
        Description:
        <input name="description" type="text" required />
      </label>
      <button type="submit">Add beer</button>
    </form>
  );
}
