import React, { useContext, useEffect, useState } from "react";
import { Typography, Form, Input, Checkbox, Button } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import { NotificationContext } from "../../../context/NotificationContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getLocalStoragedata,
  setLocalStorageData,
} from "../../../helpers/StorageHelper";
import MailIcon from "../../../assets/images/svg/onBoarding/MailIcon";
import Password from "../../../assets/images/svg/onBoarding/Password";
import AppStore from "../../../assets/images/svg/onBoarding/AppStore";
import PlayStore from "../../../assets/images/svg/onBoarding/PlayStore";
import CustomButton from "../../../components/buttons/CustomButton";
import UserIcon from "../../../assets/images/svg/onBoarding/UserIcon";
import SignInServices from "../../../services/SignInServices";
const { Text, Link } = Typography;

const SignUpView = () => {
  const { openNotification, handleError, token } =
    useContext(NotificationContext);
  const { setToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { signUpUser } = SignInServices();
  const location = useLocation();

  const handleClick = () => {
    setLoading(true);
    navigate("/onboarding/sign-in");
  };

  const SignUpFormSubmission = async (e) => {
    setUploading(true);

    const data = {
      username: e?.username,
      email: e?.email,
      password: e?.password,
    };

    const response = await signUpUser(data);
    if (response) {
      if (response.responseType === "success") {
        openNotification("success", response?.output?.message);
        navigate("/onboarding/sign-in");
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
      } else if (response.responseType === "error") {
        handleError(response?.output);
      }
    } else {
      openNotification("error", "Something went wrong");
    }

    setUploading(false);
  };
  return (
    <div
      className={
        "z-10 w-full rounded-3xl bg-white p-5 sm:w-[500px] md:px-10 md:py-7"
      }
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.57)",
      }}
    >
      <Text className="text-colorTextGray flex items-center justify-center pb-10 text-[20px] font-semibold">
        Sign up to Continue
      </Text>
      <Form
        className="flex h-full w-full flex-col justify-between"
        onFinish={SignUpFormSubmission}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label={
            <div className="flex flex-row items-center gap-1 pb-1 capitalize">
              <UserIcon className />
              <Text className="text-xs font-medium sm:text-sm 3xl:text-lg">
                Username
              </Text>
            </div>
          }
          layout="vertical"
          className="mb-3 text-start"
          rules={[
            {
              required: true,
              message: "Username is required!",
              whitespace: true,
            },
          ]}
        >
          <Input
            placeholder="John"
            size="large"
            maxLength={60}
            onKeyDown={(e) => {
              const key = e.key;
              if (/\s|\d/.test(key)) e.preventDefault();
            }}
            onPaste={(e) => {
              e.preventDefault();
              const pastedText = e.clipboardData.getData("text/plain");
              const cleanedText = pastedText.replace(/\s+/g, "").trim();
              if (!/\d/.test(cleanedText))
                document.execCommand("insertText", false, cleanedText);
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          layout="vertical"
          label={
            <div className="flex flex-row items-center gap-1 pb-1 capitalize">
              <MailIcon />
              <Text className="text-md font-medium">Email</Text>
            </div>
          }
          className="mb-3 text-start"
          rules={[
            {
              required: true,
              message: "Username is required!",
              whitespace: true,
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter email"
            className="ant-input-affix-wrapper-focused:!bg-white hover:!bg-white focus:!bg-white"
            maxLength={100}
            autoComplete="off"
            onKeyDown={(e) => {
              const key = e.key;
              if (!/^[A-Za-z+.@0-9]*$/.test(key) && key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          layout="vertical"
          label={
            <div className="flex flex-row items-center gap-1 pb-1 capitalize">
              {/* <Password /> */}
              <Text className="text-md font-medium">Password</Text>
            </div>
          }
          style={{ textAlign: "left" }}
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter password"
            maxLength={60}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          className="mt-5"
        >
          <CustomButton
            type="primary"
            className="w-full"
            size="large"
            htmlType="submit"
            loading={uploading}
            buttonName="Sign up"
          />
        </Form.Item>
      </Form>
      <Text className="flex items-center justify-center gap-1">
        Already have an account?
        <Link
          loading={loading.toString()}
          onClick={handleClick}
          style={{ color: "var(--primary)" }}
        >
          Sign in
        </Link>
      </Text>
      <div className="flex items-center justify-center">
        <div className="flex flex-row gap-3 pt-3">
          <AppStore />
          <PlayStore />
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
