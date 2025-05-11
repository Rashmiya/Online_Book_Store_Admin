import React from "react";

const SimpleClose = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 10L10 14M9.99998 10L14 14"
        stroke="#525252"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SimpleClose;
