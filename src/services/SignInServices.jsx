import React from "react";
import useFetch from "../hooks/useFetch";

const SignInServices = () => {
  const { fetchAction } = useFetch();

  const handleResponse = (response) => {
    if (response?.success) {
      return { responseType: "success", output: response };
    } else {
      return { responseType: "fail", output: response };
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await fetchAction({
        query: "/customer/signin",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const loginAdmin = async (data) => {
    try {
      const response = await fetchAction({
        query: "/admin/signin",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const signUpUser = async (data) => {
    try {
      const response = await fetchAction({
        query: "/customer/signup",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const signUpAdmin = async (data) => {
    try {
      const response = await fetchAction({
        query: "/admin/signup",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const logOutUser = async (data) => {
    try {
      const response = await fetchAction({
        query: "/customer/logout",
        method: "get",
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const logOutAdmin = async (data) => {
    try {
      const response = await fetchAction({
        query: "/admin/logout",
        method: "get",
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const deleteUser = async (data) => {
    try {
      const response = await fetchAction({
        query: "/customer/delete",
        method: "delete",
        params: {
          customerId: data?.companyProfileId || 0,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const getAllUsers = async (data) => {
    try {
      const response = await fetchAction({
        query: "/customer/all",
        method: "get",
        params: {
          page: data?.page || 1,
          perPage: data?.perPage || 10,
          sort: data?.sort || 1,
          customerName: data?.customerName || "",
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const viewUser = async (data) => {
    try {
      const response = await fetchAction({
        query: "/customer/details",
        method: "get",
        params: {
          email: data?.email || "",
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const getAllAdmins = async () => {
    try {
      const response = await fetchAction({
        query: "/admin/all",
        method: "get",
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const deleteAdmin = async (data) => {
    try {
      const response = await fetchAction({
        query: "/admin/delete",
        method: "delete",
        params: {
          adminId: data?.adminId || 0,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const refreshToken = async (data) => {
    try {
      const response = await fetchAction({
        query: "/admin/refresh",
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };
  return {
    loginUser,
    signUpUser,
    logOutUser,
    loginAdmin,
    signUpAdmin,
    logOutAdmin,
    deleteUser,
    getAllUsers,
    viewUser,
    getAllAdmins,
    deleteAdmin,
    refreshToken
  };
};

export default SignInServices;
