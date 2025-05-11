import React, { createContext, useMemo, useState } from "react";
import { getLocalStoragedata } from "../helpers/StorageHelper";
import PropTypes from "prop-types";

export const BookContext = createContext({});
export function BookContextProvider({ children }) {
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    sort: 1,
    bookName: "",
    ISBN_number: "",
    searchTerm: "",
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
    }),
    [filters],
  );

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
}

export default BookContext;
