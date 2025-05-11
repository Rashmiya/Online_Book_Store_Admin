import React from "react";

const Password = ({ ...props }) => {
  return (
    <svg
      width="20"
      height="20"
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8H5C4.44772 8 4 8.44772 4 9V16C4 16.5523 4.44772 17 5 17H15C15.5523 17 16 16.5523 16 16V9C16 8.44772 15.5523 8 15 8Z"
        stroke="#0D7CFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 8V5C6 3.15905 7.56701 2 9.5 2C11.433 2 13 3.15905 13 5V5.5"
        stroke="#0D7CFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12V12.8333"
        stroke="#0D7CFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Password;
