// src/pages/Register.tsx
import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/auth/register", { email, password });
      // after register, navigate to login
      navigate("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto" }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password (min 6)</label>
          <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button style={{ marginTop: 12 }} type="submit">Register</button>
      </form>
    </div>
  );
};
