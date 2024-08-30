import { FormEvent } from "react";

async function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const response = await fetch("/api/beers", {
    method: "POST",
    body: formData,
  });

  // Handle response if necessary
  const data = await response.json();
  // ...
}

export default function Page() {
  return (
    <form onSubmit={onSubmit}>
        <h1>Add a beer</h1>
        <input type="text" name="name" required />
        <input type="text" name="description" required />
        <button type="submit">Add beer</button>
    </form>
  );
}
