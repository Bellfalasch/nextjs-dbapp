"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, name, password }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-panel auth-panel"
    >
      <div className="form-heading"><p className="eyebrow">Pull up a chair</p><h1 className="title">Join the club</h1><p>Create your taster profile for the next event.</p></div>
      <label className="label">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input"
        />
      </label>
      <label className="label">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
      </label>
      <label className="label">
        Full name
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
