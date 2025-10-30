// src/components/Stats.tsx
import React from "react";

type Props = {
  total: number;
  completed: number;
};

const Stats: React.FC<Props> = ({ total, completed }) => {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="card-soft">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <div className="meta-small">Tasks progress</div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{completed} / {total} completed</div>
        </div>
        <div className="badge-soft">{pct}%</div>
      </div>

      <div className="progress" style={{ background: "#eef2ff" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default Stats;
