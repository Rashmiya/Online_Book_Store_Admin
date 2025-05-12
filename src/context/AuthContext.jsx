import React, { createContext, useMemo, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { getLocalStoragedata } from "../helpers/StorageHelper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let adminDetails = getLocalStoragedata("adminDetails");
  const [admin, setAdmin] = useState(adminDetails);
  const [token, setToken] = useState(getLocalStoragedata("token"));
  const [userPermissionList, setUserPermissionList] = useState(
    getLocalStoragedata("userPermissionList"),
  );
  const [isAuthChack, setIsAuthChack] = useState(
    getLocalStoragedata("authCheck"),
  );
  const [timeZone, setTimeZone] = useState();
  const [profilePicture, setProfilePicture] = useState(
    getLocalStoragedata("profilePic"),
  );
  const isExpired = getLocalStoragedata("user")?.isSubscriptionExpired || false;
  const expireDate = getLocalStoragedata("user")?.subscriptionDueDate || null;

  let block = false;

  if (expireDate) {
    const date1 = dayjs(new Date());
    const dif = date1.diff(dayjs(expireDate), "day");
    block = dif > 7 ? true : false;
  }

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userPermissionList,
      setUserPermissionList,
      admin,
      setAdmin,
      timeZone,
      setTimeZone,
      isExpired,
      block,
      profilePicture,
      setProfilePicture,
      isAuthChack,
      setIsAuthChack,
    }),
    [
      token,
      userPermissionList,
      admin,
      timeZone,
      isExpired,
      block,
      profilePicture,
      isAuthChack,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
