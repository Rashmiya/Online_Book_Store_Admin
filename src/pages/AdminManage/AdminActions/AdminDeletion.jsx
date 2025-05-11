import React, { useContext, useEffect, useState } from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";
import { NotificationContext } from "../../../context/NotificationContext";
import SignInServices from "../../../services/SignInServices";
import CustomButton from "../../../components/buttons/CustomButton";
import { getLocalStoragedata } from "../../../helpers/StorageHelper";
const { Text, Title } = Typography;

const AdminDeletion = ({ admin, handleClose }) => {
  const { openNotification, handleError } = useContext(NotificationContext);
  const [isLogggedInUser, setIsLogggedInUser] = useState(false);
  const { deleteAdmin } = SignInServices();

  useEffect(() => {
    const adminDetails = getLocalStoragedata("adminDetails");
    if (adminDetails?.id === admin?.companyProfileId) {
      setIsLogggedInUser(true);
    } else {
      setIsLogggedInUser(false);
    }
  }, []);

  const handleSubmit = async () => {
    const data = {
      adminId: admin?.companyProfileId,
    };
    const response = await deleteAdmin(data);
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
      {isLogggedInUser ? (
        <Text className="flex text-center !text-xs text-red-500 font-normal md:!text-sm">
          You cannot delete this user,because you are logged in user
        </Text>
      ) : (
        <>
          <Text className="flex text-center !text-xs font-normal md:!text-sm">
            Are you sure you want to delete user from the company?
          </Text>
          <Title
            level={1}
            className="flex text-center !text-xs font-semibold !text-primary md:!text-sm"
          >
            {admin?.userName}
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
      )}
    </div>
  );
};

export default AdminDeletion;
