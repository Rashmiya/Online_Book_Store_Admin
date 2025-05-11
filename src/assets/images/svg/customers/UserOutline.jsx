import React, { useContext } from "react";

const UserOutline = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="9.99998"
        cy="6.00004"
        r="2.66667"
        stroke={"#939292"}
        strokeWidth="1.5"
      />
      <path
        d="M15.3334 13.6666C15.3334 15.3235 15.3334 16.6666 10 16.6666C4.66669 16.6666 4.66669 15.3235 4.66669 13.6666C4.66669 12.0098 7.0545 10.6666 10 10.6666C12.9455 10.6666 15.3334 12.0098 15.3334 13.6666Z"
        stroke={"#939292"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default UserOutline;
