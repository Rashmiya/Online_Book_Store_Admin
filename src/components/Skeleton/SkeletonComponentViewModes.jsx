import { Skeleton } from "antd";
import PropTypes from "prop-types";
import React from "react";

const SkeletonComponentViewModes = ({ count }) => {
  return (
    <div className="border-secondarySix mx-2 mb-[6px] h-14 flex-col items-center rounded-md border p-2">
      {Array.from({ length: count || 4 }).map((_, index) => (
        <div
          key={`skeleton-group-${index}`}
          className="flex-col gap-2 space-y-1"
        >
          <Skeleton
            key={`skeleton-1-${index}`}
            active
            paragraph={false}
            style={{ width: "50%" }}
          />
          <Skeleton
            key={`skeleton-2-${index}`}
            active
            paragraph={false}
            style={{ width: "80%" }}
          />
        </div>
      ))}
    </div>
  );
};

export default SkeletonComponentViewModes;

SkeletonComponentViewModes.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
