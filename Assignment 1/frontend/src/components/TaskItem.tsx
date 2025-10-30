// src/components/TaskItem.tsx
import React, { useState } from "react";
import * as FiIcons from "react-icons/fi";
import { Task } from "../types";

type Props = {
  task: Task;
  onToggle: (id: string) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
  onEdit: (id: string, text: string) => Promise<void> | void;
};

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.description);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (text.trim() === "" || text.trim() === task.description) {
      setEditing(false);
      return;
    }
    setBusy(true);
    try {
      await onEdit(task.id, text.trim());
      setEditing(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}>
        <input
          className="form-check-input"
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id)}
        />

        <div style={{ flex: 1 }}>
          {editing ? (
            <div className="d-flex gap-2 align-items-center">
              <input
                className="form-control edit-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
              />
              <button className="icon-btn btn btn-sm btn-outline-success" onClick={save} title="Save" disabled={busy}>
                {React.createElement(FiIcons.FiCheck as any)}
              </button>
              <button className="icon-btn btn btn-sm btn-outline-secondary" onClick={() => { setEditing(false); setText(task.description); }} title="Cancel">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 600, textDecoration: task.isCompleted ? "line-through" : undefined }}>
                {task.description}
              </div>
              <div className="meta-small">Created: {new Date(task.createdAt).toLocaleString()}</div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginLeft: 12 }}>
        <button className="icon-btn btn btn-sm btn-outline-primary" onClick={() => setEditing((s) => !s)} title="Edit">
          {React.createElement(FiIcons.FiEdit2 as any)}
        </button>
        <button
          className="icon-btn btn btn-sm btn-outline-danger"
          onClick={() => onDelete(task.id)}
          title="Delete"
        >
          {React.createElement(FiIcons.FiTrash2 as any)}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
