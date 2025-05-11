import React, { createContext, useMemo, useState } from "react";

export const OrderContext = createContext({});

export function OrderContextProvider({ children }) {
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    sort: 1,
    searchTerm: "",
  });
  const [isStatusUpdated, setIsStatusUpdated] = useState(false);
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

      isStatusUpdated,
      setIsStatusUpdated,
    }),
    [filters, isStatusUpdated],
  );

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
