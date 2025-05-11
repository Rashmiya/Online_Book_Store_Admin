import React from "react";

const User = ({ ...props }) => {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="5.99998"
        r="2.66667"
        stroke="#0D7CFF"
        strokeWidth="1.5"
      />
      <path
        d="M15.3333 13.6667C15.3333 15.3235 15.3333 16.6667 9.99996 16.6667C4.66663 16.6667 4.66663 15.3235 4.66663 13.6667C4.66663 12.0098 7.05444 10.6667 9.99996 10.6667C12.9455 10.6667 15.3333 12.0098 15.3333 13.6667Z"
        stroke="#0D7CFF"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default User;
