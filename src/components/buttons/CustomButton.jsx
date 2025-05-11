import { Button, ConfigProvider } from "antd";
import PropTypes from "prop-types";
import React from "react";

const CustomButton = ({
  buttonName,
  type = "default",
  onClick,
  ...restProps
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "transparent",
            defaultBorderColor: "var(--primary)",
            defaultColor: "var(--primary)",
            defaultHoverBorderColor: "var(--secondary)",
            defaultHoverColor: "var(--secondary)",

            colorPrimaryHover: "var(--secondary)",
            colorPrimaryBgHover: "var(--secondary)",
          },
        },
        token: {},
      }}
    >
      <Button type={type} onClick={onClick} {...restProps}>
        {buttonName}
      </Button>
    </ConfigProvider>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};
