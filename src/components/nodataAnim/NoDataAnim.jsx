import React from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";
import NoData from "../../assets/images/svg/NoData";
const { Text } = Typography;

const NoDataAnim = ({ message }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1">
      <NoData />
      <Text className="text-secondaryThree text-xs">
        {message || "No data to display."}
      </Text>
    </div>
  );
};

export default NoDataAnim;

NoDataAnim.propTypes = {
  message: PropTypes.string,
};
