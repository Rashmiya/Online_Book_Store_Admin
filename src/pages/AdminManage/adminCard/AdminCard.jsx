import React, { useState } from "react";
import UserColorProfile from "../../../components/userColorProfile/UserColorProfile";
import AdminDeletion from "../AdminActions/AdminDeletion";
import UserEmail from "../../../assets/images/svg/customers/UserEmail";
import DeleteOutline from "../../../assets/images/svg/common/DeleteOutline";
import ActionDialog from "../../../components/popups/ActionDialog";
import { Typography } from "antd";
const { Text } = Typography;

const AdminCard = ({ admin, fetchData }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userViewType, setUserViewType] = useState("view");
  const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);

  return (
    <>
      <div className="border-secondarySix hover:border-secondaryFour flex cursor-pointer flex-col gap-2 rounded-md border py-1 md:px-4">
        <div className="flex flex-col items-start xsm:flex-row md:items-center">
          <div className="flex w-full flex-row gap-2">
            <UserColorProfile
              name={admin?.userName}
              color={"red"}
              size="30px"
              textSize="12px"
            />

            <div className="flex flex-1 flex-col md:w-[90%] md:flex-row">
              <div className="flex w-full items-center md:w-1/3 md:pl-4">
                <Text className="text-xs font-semibold md:text-sm">
                  {admin?.userName?.length > 35
                    ? admin?.userName.substring(0, 35) + "..."
                    : admin?.userName}
                </Text>
              </div>

              <div className="flex w-full flex-col items-center justify-start xs:min-w-60 md:w-1/3 md:flex-row md:gap-4">
                <div className="flex w-full flex-row items-center gap-2">
                  <Text className="text-secondaryThree flex flex-row items-center gap-1 text-xxs font-normal md:text-xs lg:text-sm">
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="3" r="3" fill="#939292" />
                    </svg>
                    {admin?.roleName}
                  </Text>
                </div>
              </div>

              <div className="flex w-full flex-col items-center justify-start xs:min-w-60 md:w-1/3 md:flex-row md:gap-4">
                <div className="flex w-full flex-row items-center gap-2">
                  <UserEmail />
                  <Text className="text-secondaryTwo flex text-xs font-normal md:text-sm">
                    {admin?.email?.length > 35
                      ? admin.email?.substring(0, 35) + "..."
                      : admin.email}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-row items-center justify-center gap-1 p-2 md:w-[15%] lg:gap-8">
            <DeleteOutline
              onClick={() => {
                setOpenDeleteCustomer(true);
              }}
              className="flex w-[20px]"
            />
          </div>
        </div>
      </div>

      <ActionDialog
        modelOpen={openDeleteCustomer}
        handleCancel={() => {
          setOpenDeleteCustomer(false);
        }}
        title="Delete Admin"
      >
        <AdminDeletion
          admin={admin}
          handleClose={() => {
            setOpenDeleteCustomer(false);
            fetchData();
          }}
        />
      </ActionDialog>
    </>
  );
};

export default AdminCard;
