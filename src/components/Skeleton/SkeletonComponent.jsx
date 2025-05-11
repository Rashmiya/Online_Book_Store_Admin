import { Skeleton } from "antd";
import PropTypes from "prop-types";
import React from "react";

const SkeletonComponent = ({ count }) => {
  return (
    <div className="border-secondarySix mx-4 mb-[6px] flex h-14 flex-auto cursor-pointer items-center justify-between gap-6 rounded-md border p-2">
      {Array.from({ length: count || 4 }).map((_, index) => (
        <Skeleton
          key={index}
          active
          paragraph={false}
          style={{ width: "20%", height: "10px" }}
        />
      ))}
    </div>
  );
};

export default SkeletonComponent;

SkeletonComponent.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
