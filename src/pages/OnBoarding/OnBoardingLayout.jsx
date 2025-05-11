import React from "react";
import OnBoardingImg from "../../assets/images/svg/onBoarding/OnBoardingImg";
import { Image } from "antd";
import LandingPageImg from "../../assets/images/png/landingPage.png";
const OnBoardingLayout = ({ children }) => {
  return (
    <div className="max-w-screen relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#faf9f5] text-center">
      {/* <OnBoardingImg /> */}

      <div className="relative flex h-[100vh] w-[50%] items-center justify-center bg-[#faf9f5] p-2 text-black">
        <Image
          src={LandingPageImg}
          preview={false}
          className="left-0 top-0 h-full w-full"
        />
      </div>
      <div className="flex w-[50%] items-center justify-center">{children}</div>
    </div>
  );
};

export default OnBoardingLayout;
