import React from "react";

const UserIcon = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10.5"
        cy="6.17118"
        r="2.66667"
        stroke="#0D7CFF"
        strokeWidth="1.5"
      />
      <path
        d="M15.8334 13.8378C15.8334 15.4946 15.8334 16.8378 10.5 16.8378C5.16669 16.8378 5.16669 15.4946 5.16669 13.8378C5.16669 12.1809 7.5545 10.8378 10.5 10.8378C13.4455 10.8378 15.8334 12.1809 15.8334 13.8378Z"
        stroke="#0D7CFF"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default UserIcon;
