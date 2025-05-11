import React, { useContext, useEffect, useState } from "react";
import { Tooltip, Typography } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import ActivateOutline from "../../../assets/images/svg/actionIcons/ActivateOutline";
import DeleteOutline from "../../../assets/images/svg/actionIcons/DeleteOutline";
import DeactivateOutline from "../../../assets/images/svg/actionIcons/DeactivateOutline";
import ActionDialog from "../../../components/common/dialogs/actionDialog/ActionDialog";
import UserActivation from "../userActions/UserActivation";
import UserDeactivation from "../userActions/UserDeactivation";
import UserDeletion from "../userActions/UserDeletion";
import SideDrawer from "../../../components/common/drawers/SideDrawer";
import DeactivateUserIcon from "../../../assets/images/svg/user/DeactivateUserIcon";
import ViewIconOutline from "../../../assets/images/svg/ViewIconOutline";
import EditIconOutline from "../../../assets/images/svg/EditIconOutline";
import ChangeCompanyAdmin from "../../changeCompanyAdmin/ChangeCompanyAdmin";
import SelectCompanyAdmin from "../../changeCompanyAdmin/features/SelectCompanyAdmin";
import SendInvitation from "../../changeCompanyAdmin/features/SendInvitation";
import SendInvitationSuccess from "../../changeCompanyAdmin/features/SendInvitationSuccess";
import PropTypes from "prop-types";
import { getLocalStoragedata } from "../../../helpers/StorageHelper";
const { Text } = Typography;

const UserMenu = ({
  user,
  handleClose,
  fetchUsers,
  editUser,
  viewUser,
  activeUserCount,
}) => {
  const { userStatus, role } = user;
  const { user: authUser, userPermissionList } = useContext(AuthContext);
  const [openDeletion, setOpenDeletion] = useState(false);
  const [openDeactivation, setOpenDeactivation] = useState(false);
  const [openActivation, setOpenActivation] = useState(false);
  const [openChangeCompanyAdmin, setOpenChangeCompanyAdmin] = useState(false);
  const [openSelectCompanyAdmin, setOpenSelectCompanyAdmin] = useState(false);
  const [openSendInvitation, setOpenSendInvitation] = useState(false);
  const [userRole, setUserRole] = useState();
  const [openSendInvitationSuccess, setOpenSendInvitationSuccess] =
    useState(false);

  useEffect(() => {
    const userData = getLocalStoragedata("user");
    setUserRole(userData?.role);
  }, []);

  const canChangeCompanyOwner =
    userStatus === 1 && userRole === 3 && role === 3 && activeUserCount > 1;

  return (
    <div className="flex min-w-[160px] flex-col gap-2">
      <Text
        className="filter-text flex cursor-pointer flex-row items-center gap-2"
        onClick={(e) => {
          e.stopPropagation();
          editUser();
        }}
      >
        <EditIconOutline className="flex w-[20px]" />
        Edit
      </Text>

      {userPermissionList?.includes(7) && (
        <>
          {userStatus === 2 && role !== 3 && (
            <Text
              className="filter-text flex cursor-pointer flex-row items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setOpenActivation(true);
              }}
            >
              <ActivateOutline className="flex w-[20px]" />
              Activate
            </Text>
          )}
          {userPermissionList?.includes(7) &&
            userStatus === 1 &&
            role !== 3 &&
            role !== 4 &&
            user?.platformUserId !== authUser?.platformUserId && (
              <Tooltip
                title={
                  user?.usedAutomationCount !== 0 ? (
                    <div
                      style={{
                        fontSize: "12px",
                        lineHeight: "1.5",
                      }}
                    >
                      User cannot be deactivated as it is used in automation
                    </div>
                  ) : (
                    ""
                  )
                }
              >
                <Text
                  disabled={user?.usedAutomationCount !== 0}
                  className="filter-text flex cursor-pointer flex-row items-center gap-2"
                  onClick={(e) => {
                    if (user?.usedAutomationCount === 0) {
                      e.stopPropagation();
                      setOpenDeactivation(true);
                    }
                  }}
                >
                  <DeactivateOutline className="flex w-[20px]" />
                  Deactivate
                </Text>
              </Tooltip>
            )}
        </>
      )}

      {userPermissionList?.includes(8) && (
        <>
          {(userStatus === 2 || userStatus === 3) && role !== 3 && (
            <Text
              className="filter-text flex cursor-pointer flex-row items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeletion(true);
              }}
            >
              <DeleteOutline className="flex w-[20px]" />
              Delete
            </Text>
          )}
        </>
      )}

      {userPermissionList?.includes(7) && (
        <>
          {canChangeCompanyOwner && (
            <Text
              className="filter-text flex cursor-pointer flex-row items-center gap-2 !text-sm font-normal"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
                setOpenChangeCompanyAdmin(true);
              }}
            >
              <DeactivateOutline className="flex w-[20px]" />
              Change C.Owner
            </Text>
          )}
        </>
      )}

      <ActionDialog
        modelOpen={openDeletion}
        handleCancel={() => {
          setOpenDeletion(false);
        }}
        title="Delete User"
      >
        <UserDeletion
          user={user}
          handleClose={() => {
            setOpenDeletion(false);
            handleClose();
            fetchUsers();
          }}
        />
      </ActionDialog>

      {openDeactivation && (
        <SideDrawer
          open={openDeactivation}
          handleClose={() => {
            setOpenDeactivation(false);
            handleClose();
          }}
          size="large"
          icon={<DeactivateUserIcon className="flex w-[20px]" />}
          title="Deactivate User"
        >
          <UserDeactivation
            user={user}
            handleClose={() => {
              setOpenDeactivation(false);
              handleClose();
              fetchUsers();
            }}
          />
        </SideDrawer>
      )}

      <ActionDialog
        modelOpen={openActivation}
        handleCancel={() => {
          setOpenActivation(false);
        }}
        title="Activate User"
      >
        <UserActivation
          user={user}
          handleClose={() => {
            setOpenActivation(false);
            handleClose();
            fetchUsers();
          }}
        />
      </ActionDialog>

      {/* change admin model one */}
      <ActionDialog
        modelOpen={openChangeCompanyAdmin}
        handleCancel={() => {
          setOpenChangeCompanyAdmin(false);
        }}
        title="Change Company Owner"
      >
        <ChangeCompanyAdmin
          handleClose={() => {
            setOpenChangeCompanyAdmin(false);
            setOpenSelectCompanyAdmin(true);
          }}
        />
      </ActionDialog>

      {/* change admin model two */}
      <ActionDialog
        modelOpen={openSelectCompanyAdmin}
        handleCancel={() => {
          setOpenSelectCompanyAdmin(false);
        }}
        title="Change Company Owner"
      >
        <SelectCompanyAdmin
          handleClose={() => {
            setOpenSelectCompanyAdmin(false);
            setOpenSendInvitation(true);
          }}
        />
      </ActionDialog>

      {/* change admin model three */}
      <ActionDialog
        modelOpen={openSendInvitation}
        handleCancel={() => {
          setOpenSendInvitation(false);
        }}
        title="Change Company Owner"
      >
        <SendInvitation
          handleClose={() => {
            setOpenSendInvitation(false);
            setOpenSendInvitationSuccess(true);
          }}
        />
      </ActionDialog>

      {/* change admin model four */}
      <ActionDialog
        modelOpen={openSendInvitationSuccess}
        handleCancel={() => {
          setOpenSendInvitationSuccess(false);
        }}
        title="Change Company Owner"
      >
        <SendInvitationSuccess
          handleClose={() => {
            setOpenSendInvitationSuccess(false);
          }}
        />
      </ActionDialog>
    </div>
  );
};

export default UserMenu;

UserMenu.propTypes = {
  user: PropTypes.shape({
    userStatus: PropTypes.number,
    role: PropTypes.number,
    usedAutomationCount: PropTypes.number,
    userPermissionList: PropTypes.arrayOf(PropTypes.number),
  }),
  handleClose: PropTypes.func,
  fetchUsers: PropTypes.func,
  editUser: PropTypes.func,
  viewUser: PropTypes.func,
  activeUserCount: PropTypes.number,
};
