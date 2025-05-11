import React from "react";

const HomeIcon = ({ ...props }) => {
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
        d="M4 12.1631C4 10.3324 4 9.41702 4.41536 8.65819C4.83072 7.89937 5.58956 7.42841 7.10723 6.4865L8.70723 5.4935C10.3115 4.49783 11.1137 4 12 4C12.8863 4 13.6885 4.49783 15.2928 5.4935L16.8928 6.4865C18.4104 7.42841 19.1693 7.89937 19.5846 8.65819C20 9.41702 20 10.3324 20 12.1631V13.38C20 16.5007 20 18.061 19.0627 19.0305C18.1255 20 16.617 20 13.6 20H10.4C7.38301 20 5.87452 20 4.93726 19.0305C4 18.061 4 16.5007 4 13.38V12.1631Z"
        stroke={props.color}
        strokeWidth="1.5"
      />
      <path
        d="M14.4 16.8H9.59998"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HomeIcon;
