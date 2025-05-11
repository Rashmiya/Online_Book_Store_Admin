import { ConfigProvider, notification } from "antd";
import { createContext, useMemo, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";

export const NotificationContext = createContext({});

export function NotificationContextProvider({ children }) {
  const [api, contextHolder] = notification.useNotification({
    placement: "bottom",
    maxCount: 3,
  });
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [token, setToken] = useState(false);

  const openNotification = (type, title, description, key) => {
    api[type]({
      style: {
        paddingBottom: "6px",
        paddingTop: "14px",
      },
      message: title,
      getContainer: "false",
      description,
      key: key,
      icon:
        type === "success" ? (
          <FaRegCheckCircle className="text-white" />
        ) : (
          <RxCrossCircled className="text-white" />
        ),
      className: `${
        type === "success" ? "bg-[#36AE42]" : "bg-red-500"
      } rounded-lg z-40`,
    });
  };

  const handleError = (error) => {
    if (error.code === "ERR_NETWORK") {
      openNotification("error", "Network Error!", null, "handleError");
    } else if (error.response) {
      if (error.response.status === 401) {
        openNotification("error", "Error!", null, "handleError");
        localStorage.clear();
        window.location.replace("/login");
      } else if (error.response.status === 404) {
        openNotification("error", error?.message, null, "handleError");
      } else if (error.response.status === 500) {
        openNotification(
          "error",
          "Internal Server Error!",
          null,
          "handleError",
        );
      } else {
        openNotification("error", "Something went wrong", null, "handleError");
      }
    } else if (error.code === "ERR_BAD_REQUEST") {
      openNotification("error", error?.message, null, "handleError");
    }
  };

  const contextValue = useMemo(
    () => ({
      openNotification,
      handleError,
      dashboardLoading,
      setDashboardLoading,
      token,
      setToken,
    }),
    [dashboardLoading, token],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          components: {
            Notification: {
              paddingMD: 15,
              colorIcon: "rgb(255, 255, 255)",
              colorTextHeading: "rgba(254, 254, 254, 0.88)",
              colorIconHover: "rgb(255, 255, 255)",
            },
          },
        }}
      >
        {contextHolder}
        {children}
      </ConfigProvider>
    </NotificationContext.Provider>
  );
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node,
};
