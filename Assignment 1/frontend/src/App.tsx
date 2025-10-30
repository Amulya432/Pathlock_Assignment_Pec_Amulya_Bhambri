// src/App.tsx
import React, { useEffect, useRef, useState } from "react";
import api from "./services/api";
import { Task } from "./types";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import CircularProgress from "./components/CircularProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { motion } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";

type Filter = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // theme persistence
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // load saved tasks from backend (or local)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get<Task[]>("/tasks");
      // make sure ids are strings for consistency
      const normalized = res.data.map((t) => ({ ...t, id: String(t.id) })) as Task[];
      setTasks(normalized);
    } catch (e) {
      console.error("fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // save to localStorage for quick persistence as well
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // keyboard shortcut to focus add input
  useHotkeys("/", (e) => {
    e.preventDefault();
    inputRef.current?.focus();
  });

  const addTask = async (description: string) => {
    if (!description.trim()) return;
    try {
      setLoading(true);
      await api.post("/tasks", { description });
      await fetchTasks();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      setLoading(true);
      await api.patch(`/tasks/${id}/toggle`);
      await fetchTasks();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      setLoading(true);
      await api.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: string, description: string) => {
    try {
      setLoading(true);
      await api.patch(`/tasks/${id}`, { description });
      await fetchTasks();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.isCompleted).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  // apply client-side filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.isCompleted;
    return t.isCompleted; // completed
  });

  return (
    <div
      className={`d-flex flex-column align-items-center py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{
        background: darkMode ? "linear-gradient(180deg,#0e0e0e,#1b1b1b)" : "linear-gradient(180deg,#f8f9fa,#dee3ea)",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      {/* HEADER */}
      <motion.div
        className="shadow-lg rounded-4 px-4 py-3 mb-3 d-flex justify-content-between align-items-center"
        style={{
          width: "85%",
          maxWidth: 900,
          background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.04)",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h3 style={{ margin: 0, letterSpacing: 0.6 }}>{/* logo + title */}✨ Pathlock Task Tracker</h3>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontSize: 13, color: darkMode ? "#d1d5db" : "#6b7280" }}>
            {completed}/{total} done • {progress}%
          </div>
          <button className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </motion.div>

      {/* PROGRESS */}
      <motion.div
        className="shadow rounded-4 p-4 mb-3 text-center"
        style={{
          width: "85%",
          maxWidth: 900,
          background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.04)",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex align-items-center justify-content-center gap-4 flex-wrap">
          <CircularProgress value={progress} darkMode={darkMode} />
          <div style={{ textAlign: "left" }}>
            <h5 style={{ color: darkMode ? "#f8fafc" : "#111827", fontWeight: 700, marginBottom: 6 }}>
              {completed}/{total} tasks completed
            </h5>
            <p style={{ color: darkMode ? "#d1d5db" : "#6b7280", margin: 0, fontSize: 14 }}>
              {progress === 0 ? "Let's get started! 🚀" : progress < 50 ? "Good start — keep pushing! 💪" : progress < 100 ? "You're on fire! 🔥" : "All tasks done — amazing! 🎉"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ADD + FILTER BAR */}
      <div
        className="shadow rounded-4 p-3 mb-3 d-flex align-items-center justify-content-between"
        style={{
          width: "85%",
          maxWidth: 900,
          gap: 12,
          background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.95)",
          border: darkMode ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ flex: 1 }}>
          <AddTask onAdd={addTask} loading={loading} inputRef={inputRef} />
        </div>

        <div style={{ display: "flex", gap: 8, marginLeft: 12, alignItems: "center" }}>
          <button
            className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn btn-sm ${filter === "active" ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`btn btn-sm ${filter === "completed" ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <motion.div
        className="shadow rounded-4 p-4 mb-4"
        style={{
          width: "85%",
          maxWidth: 900,
          background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.97)",
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="list-group" style={{ margin: 0 }}>
          {loading && (
            <li className="list-group-item text-center py-3">Loading…</li>
          )}

          {!loading && filteredTasks.length === 0 && (
            <li className="list-group-item text-center py-4">No tasks in this view — try another filter or add one.</li>
          )}

          {!loading &&
            filteredTasks.map((t) => (
              <TaskItem key={String(t.id)} task={t} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
            ))}
        </ul>
      </motion.div>

      <footer style={{ color: darkMode ? "#d1d5db" : "#6b7280", marginBottom: 24 }}>
        Built with ❤️ by <span style={{ fontWeight: 700, color: darkMode ? "#4ade80" : "#0d6efd" }}>Amulya Bhambri</span>
      </footer>
    </div>
  );
}

export default App;
