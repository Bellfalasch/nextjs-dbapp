"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      redirect(`/login`);
    } else {
      alert("Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className="title">Register user</h1>
      <label className="label">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input"
        />
      </label>
      <label className="label">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
      </label>
      <label className="label">
        Full Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </label>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Register
          </button>
        </div>
        <div className="control">
          <Link href="/" className="button is-link is-light">Cancel</Link>
        </div>
      </div>
    </form>
  );
}
