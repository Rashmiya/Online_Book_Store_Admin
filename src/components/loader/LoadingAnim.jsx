import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const LoadingAnim = ({ size }) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: size ? size : 32,
            color: "primary",
          }}
          spin
        />
      }
    />
  );
};

export default LoadingAnim;
