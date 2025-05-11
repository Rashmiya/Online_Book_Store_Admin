import React from "react";
import { Outlet } from "react-router-dom";
import OnBoardingLayout from "./OnBoardingLayout";

const OnBoardingProcess = () => {
  return (
    <OnBoardingLayout>
      <Outlet />
    </OnBoardingLayout>
  );
};

export default OnBoardingProcess;
