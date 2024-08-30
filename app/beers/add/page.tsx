import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import createItem from "@/db/beers/add-one";
import React from "react";

const addBeer = async (formData: FormData) => {
  "use server";

  const thing = await createItem(
    formData.get("name") as string,
    formData.get("description") as string
  );

  //revalidatePath("/things");
  //redirect(`/things`);
};

export default function AddBeer() {
  return (
    <form action={addBeer} className="flex flex-col place-items-baseline">
      <h1 className="text-xl mb-2">Add a New Thing</h1>
      <label>
        Name:
        <input name="name" type="text" required className="border" />
      </label>
      <label>
        Description:
        <input
          name="description"
          required
          min="0"
          className="border"
        />
      </label>
      <button type="submit">Add thing</button>
    </form>
  );
}
