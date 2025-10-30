// src/components/AddTask.tsx
import React, { useRef } from "react";

type Props = {
  onAdd: (desc: string) => Promise<void> | void;
  loading?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>; 
};


const AddTask: React.FC<Props> = ({ onAdd, loading = false, inputRef }) => {
  const [text, setText] = React.useState("");
  const localRef = useRef<HTMLInputElement | null>(null);
  const ref = inputRef ?? localRef;

  const submit = async () => {
    if (!text.trim()) return;
    await onAdd(text.trim());
    setText("");
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        ref={ref as React.RefObject<HTMLInputElement>}
        className="form-control"
        placeholder="Add a new task... (press Enter to add)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
      />
      <button className="btn btn-primary" onClick={submit} disabled={loading}>
        + Add
      </button>
    </div>
  );
};

export default AddTask;
