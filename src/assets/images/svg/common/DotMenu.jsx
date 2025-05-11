import React, { useContext } from "react";

const DotMenu = ({ ...props }) => {
  return (
    <svg
      width="4"
      height="16"
      viewBox="0 0 4 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="2" cy="2" r="1.5" fill={"#525252"} />
      <circle cx="2" cy="8" r="1.5" fill={"#525252"} />
      <circle cx="2" cy="14" r="1.5" fill={"#525252"} />
    </svg>
  );
};

export default DotMenu;
