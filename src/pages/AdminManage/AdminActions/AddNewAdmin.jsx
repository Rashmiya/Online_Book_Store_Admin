import { Form, Input, Typography } from "antd";
import React, { useContext, useState } from "react";
import UserIcon from "../../../assets/images/svg/onBoarding/UserIcon";
import MailIcon from "../../../assets/images/svg/onBoarding/MailIcon";
import Password from "antd/es/input/Password";
import CustomButton from "../../../components/buttons/CustomButton";
import SignInServices from "../../../services/SignInServices";
import { NotificationContext } from "../../../context/NotificationContext";
const { Text, Link } = Typography;
const AddNewAdmin = ({ handleClose }) => {
  const { signUpAdmin } = SignInServices();
  const { openNotification, handleError } = useContext(NotificationContext);
  const [uploading, setUploading] = useState(false);

  const SignUpFormSubmission = async (e) => {
    setUploading(true);

    const data = {
      username: e?.username,
      email: e?.email,
      password: e?.password,
    };

    const response = await signUpAdmin(data);
    if (response) {
      if (response.responseType === "success") {
        openNotification("success", response?.output?.message);
        handleClose();
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
    <div className="flex h-full w-full flex-col">
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
    </div>
  );
};

export default AddNewAdmin;
