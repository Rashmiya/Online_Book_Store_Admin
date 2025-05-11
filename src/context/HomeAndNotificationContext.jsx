import PropTypes from "prop-types";
import React, { createContext, useMemo, useState } from "react";

const HomeAndNotificationContext = createContext({});

export function HomeAndNotificationContextProvider({ children }) {
  const [isHome, setIsHome] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  const contextValue = useMemo(
    () => ({
      isHome,
      setIsHome,

      selectedIcon,
      setSelectedIcon,

      openCartDrawer,
      setOpenCartDrawer,
    }),
    [isHome, selectedIcon, openCartDrawer],
  );

  return (
    <HomeAndNotificationContext.Provider value={contextValue}>
      {children}
    </HomeAndNotificationContext.Provider>
  );
}

export default HomeAndNotificationContext;

HomeAndNotificationContextProvider.propTypes = {
  children: PropTypes.node,
};
