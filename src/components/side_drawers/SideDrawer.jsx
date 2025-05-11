import { Drawer, Typography } from "antd";
import React from "react";
import PropTypes from "prop-types";
import CloseOutline from "../../assets/images/svg/common/CloseOutline";
const { Title } = Typography;

const SideDrawer = ({
  size,
  open,
  handleClose,
  icon,
  title,
  children,
  width,
}) => {
  return (
    <Drawer
      placement="right"
      size={size}
      onClose={handleClose}
      open={open}
      closeIcon={null}
      destroyOnClose={true}
      width={width}
      rootStyle={{ position: "fixed" }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="flex"></div>

          <div className="flex flex-row items-center gap-2">
            <div>{icon}</div>
            <Title
              level={1}
              className="!mb-0 flex p-0 !text-sm font-medium lg:!text-sm 3xl:!text-base"
            >
              {title}
            </Title>
          </div>
          <div
            className="flex cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <CloseOutline />
          </div>
        </div>
        <div className="0 flex flex-col items-center justify-center gap-4">
          {children}
        </div>
      </div>
    </Drawer>
  );
};

export default SideDrawer;

SideDrawer.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
};
