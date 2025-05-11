import React from "react";

const SearchOutline = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.875 14.25C11.3958 14.25 14.25 11.3958 14.25 7.875C14.25 4.3542 11.3958 1.5 7.875 1.5C4.3542 1.5 1.5 4.3542 1.5 7.875C1.5 11.3958 4.3542 14.25 7.875 14.25Z"
        stroke="#939292"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.4581 12.4581L15.6401 15.6401"
        stroke="#939292"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchOutline;
