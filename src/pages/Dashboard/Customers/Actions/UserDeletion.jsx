import React, { useContext } from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";
import { NotificationContext } from "../../../../context/NotificationContext";
import SignInServices from "../../../../services/SignInServices";
import CustomButton from "../../../../components/buttons/CustomButton";
const { Text, Title } = Typography;

const UserDeletion = ({ user, handleClose }) => {
  const { openNotification, handleError } = useContext(NotificationContext);
  const { deleteUser } = SignInServices();

  const handleSubmit = async () => {
    const data = {
      companyProfileId: user?.companyProfileId,
    };
    const response = await deleteUser(data);
    if (response) {
      if (response.responseType === "success") {
        openNotification("success", response?.output?.message);
        handleClose();
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
      } else if (response.responseType === "error") {
        handleError(response.output);
      }
    } else {
      openNotification("error", "Something went wrong");
    }
  };

  return (
    <div className="m-4 flex flex-col items-center justify-center">
      {user?.orderCount === 0 ? (
        <>
          <Text className="flex text-center !text-xs font-normal md:!text-sm">
            Are you sure you want to delete user from the company?
          </Text>
          <Title
            level={1}
            className="flex text-center !text-xs font-semibold !text-primary md:!text-sm"
          >
            {user?.userName}
          </Title>
          <Text className="flex text-center !text-xs font-normal md:!text-sm">
            Deleting this user from the company will block access to the company
            facilities.
          </Text>
          <CustomButton
            type="primary"
            className="mt-4"
            onClick={handleSubmit}
            buttonName="Delete User"
          />
        </>
      ) : (
        <Text className="flex text-center !text-xs font-normal text-red-500 md:!text-sm">
          Unable to delete user. User has active orders.
        </Text>
      )}
    </div>
  );
};

export default UserDeletion;

UserDeletion.propTypes = {
  user: PropTypes.shape({
    companyProfileId: PropTypes.string,
    userName: PropTypes.string,
  }),
  handleClose: PropTypes.func,
};
