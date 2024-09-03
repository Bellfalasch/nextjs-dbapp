import deleteBeer from "@/db/beers/delete-one";
import { revalidatePath } from "next/cache";

type DeleteThing = {
  beerId: number;
};

export default function deleteThing({ beerId }: DeleteThing) {
  const deleteThing = async () => {
    "use server";
    await deleteBeer(beerId);
    revalidatePath("/beers");
  };

  return (
    <form>
      <button formAction={deleteThing} className="m-8">
        Delete me
      </button>
    </form>
  );
}
