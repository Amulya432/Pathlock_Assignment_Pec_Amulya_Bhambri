// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Project } from "../types";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) return alert("Title required (3+ chars)");
    try {
      const res = await api.post("/projects", { title, description: desc });
      setProjects((p) => [res.data, ...p]);
      setTitle(""); setDesc("");
    } catch (err: any) { alert(err?.response?.data?.message || err.message); }
  };

  const remove = async (id: any) => {
    if (!window.confirm("Delete project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((p) => p.filter((x) => x.id !== id));
    } catch (err: any) { alert(err?.response?.data?.message || err.message); }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Projects</h2>
      <form onSubmit={create} style={{ marginBottom: 12 }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required minLength={3} />
        <input placeholder="Description (optional)" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button type="submit">Create</button>
      </form>

      {loading ? <p>Loading…</p> : (
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              <strong onClick={() => navigate(`/projects/${p.id}`)} style={{ cursor: "pointer" }}>{p.title}</strong>
              {" — "}
              <button onClick={() => remove(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
