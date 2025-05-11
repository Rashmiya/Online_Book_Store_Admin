import React from "react";

const OnlinEReadIcon = ({ color = "white" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.7998 9.60005C4.7998 7.33731 4.7998 6.20594 5.50275 5.50299C6.20569 4.80005 7.33706 4.80005 9.5998 4.80005H14.3998C16.6625 4.80005 17.7939 4.80005 18.4969 5.50299C19.1998 6.20594 19.1998 7.33731 19.1998 9.60005V13.6C19.1998 15.1085 19.1998 15.8628 18.7312 16.3314C18.2625 16.8 17.5083 16.8 15.9998 16.8H7.9998C6.49131 16.8 5.73706 16.8 5.26843 16.3314C4.7998 15.8628 4.7998 15.1085 4.7998 13.6V9.60005Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M20 19.2H4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.4001 14.3999H9.6001"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default OnlinEReadIcon;
