import React, { createContext, useMemo, useState } from "react";
import { getLocalStoragedata } from "../helpers/StorageHelper";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [adminEmail, setAdminEmail] = useState(
    getLocalStoragedata("adminEmail"),
  );

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    sort: 1,
    userStatus: 0,
    role: 0,
    companyPipelineId: 0,
    userName: "",
  });

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const contextValue = useMemo(
    () => ({
      filters,
      setFilters,
      updateFilters,
      adminEmail,
      setAdminEmail,
    }),
    [filters, adminEmail],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node,
};
