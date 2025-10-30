// src/components/CircularProgress.tsx
import React from "react";

type Props = {
  value: number;
  size?: number;
  strokeWidth?: number;
  darkMode?: boolean;
};

const CircularProgress: React.FC<Props> = ({
  value,
  size = 100,
  strokeWidth = 10,
  darkMode = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const strokeColor = darkMode ? "#4ade80" : "#0d6efd"; // green in dark mode, blue in light

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-block",
      }}
    >
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          stroke={darkMode ? "#444" : "#e6e6e6"}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease",
          }}
        />
      </svg>
      {/* Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: 700,
          color: darkMode ? "#f8f9fa" : "#212529", 
          fontSize: 18,
        }}
      >
        {value}%
      </div>
    </div>
  );
};

export default CircularProgress;
