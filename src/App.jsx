import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import Routerset from "./routes/Routerset";

function App() {
  const containerStyle = {
    width: "100%",
    maxWidth: "100vw",
    minHeight: "100vh",
    backgroundColor: "#FFFFFF",
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter-Regular",
        },
        components: {
          Notification: {
            paddingContentHorizontalLG: 12,
            paddingMD: 6,
            paddingLG: 12,
            fontSizeLG: 14,
            controlHeightLG: 40,
            colorBgElevated: "#36AE42",
            colorIcon: "rgb(255, 255, 255)",
            colorTextHeading: "rgba(254, 254, 254, 0.88)",
            colorIconHover: "rgb(255, 255, 255)",
          },
          Spin: {
            colorPrimary: "var(--color-green)",
          },
          Popover: {
            colorTextHeading: "var(--primary)",
          },
          Input: {
            fontSizeSM: 10,
            fontSize: 12,
            fontSizeLG: 14,
            autoComplete: "off",
          },
          InputNumber: {
            fontSizeSM: 10,
            fontSize: 14,
            fontSizeLG: 14,
          },
          DatePicker: {
            fontSizeSM: 10,
            fontSize: 12,
            fontSizeLG: 14,
          },
          Select: {
            fontSizeSM: 10,
            fontSize: 12,
            fontSizeLG: 14,
          },
          Tabs: {
            colorText: "white",
            itemActiveColor: "red",
          },
          Form: {
            fontSizeSM: 10,
            fontSize: 12,
            fontSizeLG: 14,
          },
        },
      }}
    >
      <div style={containerStyle}>
        <BrowserRouter>
          <Routerset />
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;
