import React, { useContext } from "react";

const StatusLabel = ({ status }) => {
  const { label, color, bgColor, borderColor } = status || {}; // Fallback to empty object if status is undefined

  return label ? ( // Only render if label exists
    <div
      className={`w-25 flex h-fit items-center justify-center rounded-xl border px-2 text-xxs font-semibold tracking-widest ${borderColor} ${bgColor} ${color} `}
    >
      {label}
    </div>
  ) : null; // Return null if no label
};

export default StatusLabel;
