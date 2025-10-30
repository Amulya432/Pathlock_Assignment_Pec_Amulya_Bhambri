// src/pages/Login.tsx
import React, { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      // adapt if backend returns token property name different e.g. accessToken
      const token = res.data.token ?? res.data.accessToken ?? res.data;
      if (!token) throw new Error("Token missing in response");
      login(token);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button style={{ marginTop: 12 }} type="submit">Login</button>
      </form>
    </div>
  );
};
