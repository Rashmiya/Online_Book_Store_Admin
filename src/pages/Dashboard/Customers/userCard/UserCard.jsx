import React, { useState } from "react";
import { Popover, Typography } from "antd";
import PropTypes from "prop-types";
import UserColorProfile from "../../../../components/userColorProfile/UserColorProfile";
import UserEmail from "../../../../assets/images/svg/customers/UserEmail";
import EditIconOutline from "../../../../assets/images/svg/common/EditIconOutline";
import DeleteOutline from "../../../../assets/images/svg/common/DeleteOutline";
import SideDrawer from "../../../../components/side_drawers/SideDrawer";
import User from "../../../../assets/images/svg/common/User";
import UserView from "../userView/UserView";
import ActionDialog from "../../../../components/popups/ActionDialog";
import UserDeletion from "../Actions/UserDeletion";
const { Text } = Typography;

const UserCard = ({ user, fetchData, activeUserCount }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userViewType, setUserViewType] = useState("view");
  const [openDeleteAdmin, setOpenDeleteAdmin] = useState(false);

  return (
    <>
      <div className="border-secondarySix hover:border-secondaryFour flex cursor-pointer flex-col gap-2 rounded-md border py-1 md:px-4">
        <div className="flex flex-col items-start xsm:flex-row md:items-center">
          <div
            className="flex w-full flex-row gap-2"
            onClick={() => {
              setUserViewType("view");
              setOpenDrawer(true);
            }}
          >
            <UserColorProfile
              name={user?.userName}
              color={"blue"}
              size="30px"
              textSize="12px"
            />

            <div className="flex flex-1 flex-col md:w-[90%] md:flex-row">
              <div className="flex w-full items-center md:w-1/3 md:pl-4">
                <Text className="text-xs font-semibold md:text-sm">
                  {user?.userName?.length > 35
                    ? user?.userName.substring(0, 35) + "..."
                    : user?.userName}
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
                    Role: {user?.roleName}
                  </Text>
                </div>
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
                    Orders : {user?.orderCount}
                  </Text>
                </div>
              </div>

              {/* <div className="flex w-full flex-col items-center justify-start xs:min-w-60 md:w-1/3 md:flex-row md:gap-4">
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
                    {user?.roleName}
                  </Text>
                </div>
              </div> */}

              <div className="flex w-full flex-col items-center justify-start xs:min-w-60 md:w-1/3 md:flex-row md:gap-4">
                <div className="flex w-full flex-row items-center gap-2">
                  <UserEmail />
                  <Text className="text-secondaryTwo flex text-xs font-normal md:text-sm">
                    {user?.email?.length > 35
                      ? user.email?.substring(0, 35) + "..."
                      : user.email}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-row items-center justify-center gap-1 p-2 md:w-[15%] lg:gap-8">
            <DeleteOutline
              onClick={() => {
                setOpenDeleteAdmin(true);
              }}
              className="flex w-[20px]"
            />
          </div>
        </div>
      </div>
      {openDrawer && (
        <SideDrawer
          open={openDrawer}
          handleClose={() => {
            setOpenDrawer(false);
          }}
          size="large"
          icon={<User className="flex w-[20px]" />}
          title="Customer Details"
        >
          <UserView user={user} type={userViewType} fetchData={fetchData} />
        </SideDrawer>
      )}
      <ActionDialog
        modelOpen={openDeleteAdmin}
        handleCancel={() => {
          setOpenDeleteAdmin(false);
        }}
        title="Delete Customer"
      >
        <UserDeletion
          user={user}
          handleClose={() => {
            setOpenDeleteAdmin(false);
            fetchData();
          }}
        />
      </ActionDialog>
    </>
  );
};

export default UserCard;

UserCard.propTypes = {
  user: PropTypes.shape({
    profilePictureUrl: PropTypes.string,
    userName: PropTypes.string,
    roleName: PropTypes.string,
    teams: PropTypes.array,
    pipelineCount: PropTypes.number,
    email: PropTypes.string,
    userStatus: PropTypes.number,
    profileColor: PropTypes.string,
    activeUserCount: PropTypes.number,
  }),
  fetchData: PropTypes.func,
};
