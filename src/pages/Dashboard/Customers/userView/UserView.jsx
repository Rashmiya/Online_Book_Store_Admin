import React, { useContext, useEffect, useState } from "react";
import { Select, Skeleton, Tooltip, Typography } from "antd";
import PropTypes from "prop-types";
import UserColorProfile from "../../../../components/userColorProfile/UserColorProfile";
import { NotificationContext } from "../../../../context/NotificationContext";
import UserOutline from "../../../../assets/images/svg/customers/UserOutline";
import EmailOutline from "../../../../assets/images/svg/customers/EmailOutline";
import RoleOutline from "../../../../assets/images/svg/customers/RoleOutline";
import PhoneOutline from "../../../../assets/images/svg/customers/PhoneOutline";
import CalendarOutline from "../../../../assets/images/svg/customers/CalendarOutline";
import CountryOutline from "../../../../assets/images/svg/customers/CountryOutline";
import { formatDateWithDayExtension } from "../../../../helpers/DateFormatHelper";
import SignInServices from "../../../../services/SignInServices";
import CartIcon from "../../../../assets/images/svg/MainLayout/CartIcon";

const { Text } = Typography;

const UserView = ({ user, fetchData, type }) => {
  const { openNotification, handleError } = useContext(NotificationContext);

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const { viewUser } = SignInServices();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const response = await viewUser({
      email: user?.email,
    });
    if (response) {
      if (response.responseType === "success") {
        setUserData(response.output.data);
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
      } else if (response.responseType === "error") {
        handleError(response.output);
      }
    } else {
      openNotification("error", "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex h-full w-full flex-col">
          <Skeleton
            active
            paragraph={false}
            className="mt-6 flex w-1/2 justify-start"
          />
          <Skeleton.Image active className="m-5 h-48 rounded-full" />
          <Skeleton active className="mt-2 flex justify-start" />
          <Skeleton active className="mt-4 flex justify-start" />
        </div>
      ) : (
        <div className={`mt-5 flex w-full flex-col gap-8`}>
          <div className="flex flex-row gap-5">
            <div className="flex flex-row gap-2">
              <UserColorProfile
                name={userData?.userName || "N Z"}
                color={user?.profileColor}
                size="80px"
                textSize="32px"
              />
            </div>
          </div>

          <div className="border-basicBorder flex flex-col gap-4 rounded border p-2">
            <div className="mt-4 flex flex-row gap-2">
              <Text className="text-secondaryThree flex items-center gap-2 text-xxs font-normal xsm:w-28 sm:w-20 md:w-32 lg:text-xs">
                <UserOutline className="flex w-[20px]" />
                Name
              </Text>
              <Text className="flex flex-row flex-wrap text-xs font-bold md:text-sm">
                {userData?.userName?.length > 60
                  ? userData?.userName?.substring(0, 60) + "..."
                  : userData?.userName}
              </Text>
            </div>
            <div className="flex flex-row gap-2">
              <Text className="text-secondaryThree flex w-20 items-center gap-2 text-xxs font-normal md:w-32 lg:text-xs">
                <EmailOutline className="flex w-[20px]" />
                Email
              </Text>
              <Text className="flex flex-row flex-wrap text-xs font-bold md:text-sm">
                {userData?.email || "-"}
              </Text>
            </div>
            <div className="flex flex-row gap-2">
              <Text className="text-secondaryThree flex w-20 items-center gap-2 text-xxs font-normal md:w-32 lg:text-xs">
                <RoleOutline className="flex w-[20px]" />
                Role
              </Text>
              <Text className="flex flex-row flex-wrap gap-2 text-xs font-bold lg:text-sm 3xl:text-lg">
                {userData?.roleName}
              </Text>
            </div>
          </div>

          <div className="border-basicBorder flex flex-col gap-2" key="details">
            <div className="border-basicBorder flex flex-row gap-2 rounded border p-2">
              <Text className="text-secondaryThree flex w-28 items-center gap-2 text-xxs font-normal md:w-32 lg:text-xs">
                <PhoneOutline className="flex w-[20px]" />
                Phone Number
              </Text>
              <Text className="flex flex-row flex-wrap text-xs font-bold md:text-sm">
                {userData?.phoneNumber != 0 && userData?.phoneNumber != null
                  ? "+" + userData?.phoneNumber
                  : "-"}
              </Text>
            </div>
            <div className="border-basicBorder flex flex-row gap-2 rounded border p-2">
              <Text className="text-secondaryThree flex w-28 items-center gap-2 text-xxs font-normal md:w-32 lg:text-xs">
                <CalendarOutline className="flex w-[20px]" />
                Joined Date
              </Text>
              <Text className="flex flex-row flex-wrap text-xs font-bold md:text-sm">
                {userData?.joinDate !== null && userData?.joinDate !== undefined
                  ? formatDateWithDayExtension(userData?.joinDate)
                  : "-"}
              </Text>
            </div>
            <div className="border-basicBorder flex flex-row gap-2 rounded border p-2">
              <Text className="text-secondaryThree flex w-28 items-center gap-2 text-xxs font-normal md:w-32 lg:text-xs">
                <CountryOutline className="flex w-[20px]" />
                Address
              </Text>
              <Text className="flex flex-row flex-wrap text-xs font-bold md:text-sm">
                {userData?.country || "-"}
              </Text>
            </div>
            <div className="border-basicBorder flex flex-row gap-2 rounded border p-2">
              <Text className="text-secondaryThree flex w-28 items-center gap-2 text-xxs font-normal md:w-32 lg:text-xs">
                <CartIcon className="flex w-[20px]" color={"#939292"} />
                Orders
              </Text>
              <Text className="flex flex-row flex-wrap text-xs font-bold md:text-sm">
                {userData?.orderCount || "-"}
              </Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserView;

UserView.propTypes = {
  user: PropTypes.shape({
    companyProfileId: PropTypes.string,
    platformUserId: PropTypes.string,
    profileColor: PropTypes.string,
    userStatus: PropTypes.number,
    userName: PropTypes.string,
    email: PropTypes.string,
    roleName: PropTypes.string,
    role: PropTypes.number,
    phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    joinDate: PropTypes.string,
    designation: PropTypes.string,
    country: PropTypes.string,
  }),

  fetchData: PropTypes.func,

  type: PropTypes.oneOf(["edit", "view"]),
};
