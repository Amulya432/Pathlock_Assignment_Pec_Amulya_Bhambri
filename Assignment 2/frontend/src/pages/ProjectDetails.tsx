// src/pages/ProjectDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Project, TaskItem } from "../types";

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState<string>("");
  const navigate = useNavigate();

  const load = async () => {
    try {
      const p = await api.get(`/projects/${id}`);
      setProject(p.data);
      const t = await api.get(`/projects/${id}/tasks`);
      setTasks(t.data || []);
    } catch (err: any) {
      console.error(err);
      alert("Failed loading project");
    }
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    const res = await api.post(`/projects/${id}/tasks`, { title: taskTitle, dueDate: dueDate || null });
    setTasks((s) => [res.data, ...s]);
    setTaskTitle(""); setDueDate("");
  };

  const toggle = async (t: TaskItem) => {
    const res = await api.put(`/projects/${id}/tasks/${t.id}`, { ...t, isCompleted: !t.isCompleted });
    setTasks((s) => s.map((x) => (x.id === t.id ? res.data : x)));
  };

  const remove = async (taskId: any) => {
    if (!window.confirm("Delete task?")) return;
    await api.delete(`/projects/${id}/tasks/${taskId}`);
    setTasks((s) => s.filter((x) => x.id !== taskId));
  };

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate("/")}>← Back</button>
      <h2>{project?.title}</h2>
      <p>{project?.description}</p>

      <form onSubmit={addTask}>
        <input placeholder="Task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isCompleted} onChange={() => toggle(t)} />
            <span style={{ textDecoration: t.isCompleted ? "line-through" : undefined, marginLeft: 8 }}>{t.title}</span>
            {t.dueDate && <small style={{ marginLeft: 8 }}>due {new Date(t.dueDate).toLocaleDateString()}</small>}
            <button style={{ marginLeft: 8 }} onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
