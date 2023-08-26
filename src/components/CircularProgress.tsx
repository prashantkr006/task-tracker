import React from "react";

interface CircularProgressProps {
  percent: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percent }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  let color: string;
  if (percent === 100) {
    color = "green";
  } else if (percent >= 50) {
    color = "yellow";
  } else if (percent > 0) {
    color = "orange";
  } else {
    color = "gray";
  }

  return (
    <svg width="100" height="100">
      <circle
        r={radius}
        cx="50"
        cy="50"
        stroke={color}
        strokeWidth="10"
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
      />
      <text x="50" y="50" textAnchor="middle" dy="7">
        {percent}%
      </text>
    </svg>
  );
};

export default CircularProgress;
