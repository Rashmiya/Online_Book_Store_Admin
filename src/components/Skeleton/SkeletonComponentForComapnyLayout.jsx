import { Skeleton } from "antd";
import React from "react";

const SkeletonComponentForComapnyLayout = () => {
  return (
    <div className="flex h-full w-full">
      <div className="flex w-2/6 flex-col items-center justify-start space-y-4 p-4">
        <Skeleton active paragraph={false} />
        <Skeleton.Image
          active
          className="my-10 flex h-48 w-full items-center justify-center rounded-lg"
        />
        <Skeleton active />
        <Skeleton active />
      </div>
      <div className="h-full w-4/6 flex-col space-y-4 border-l p-4">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    </div>
  );
};

export default SkeletonComponentForComapnyLayout;
