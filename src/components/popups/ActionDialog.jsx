import { Divider, Modal, Typography } from "antd";
import PropTypes from "prop-types";
import CloseOutline from "../../assets/images/svg/common/CloseOutline";
const { Title } = Typography;

const ActionDialog = ({
  size,
  modelOpen,
  handleCancel,
  title,
  children,
  height,
  icon,
}) => {
  return (
    <Modal
      open={modelOpen}
      onCancel={handleCancel}
      closeIcon={false}
      className={`flex flex-col rounded-md`}
      width={size}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      height={height}
    >
      <div className="flex flex-row items-center justify-between">
        <Title
          level={1}
          className="mt-1 flex items-center justify-center gap-2 !text-xs font-semibold md:!text-sm 3xl:!text-base"
        >
          {icon}
          {title}
        </Title>

        <CloseOutline
          className="cursor-pointer items-center justify-center"
          onClick={handleCancel}
        />
      </div>
      <Divider className="border-basicBorder my-1 flex" />
      <div className="flex justify-center">{children}</div>
    </Modal>
  );
};

export default ActionDialog;

ActionDialog.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modelOpen: PropTypes.bool,
  handleCancel: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
};
