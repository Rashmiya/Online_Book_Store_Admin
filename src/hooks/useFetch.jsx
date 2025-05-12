import { useContext, useState } from "react";
import axios from "axios";
import { NotificationContext } from "../context/NotificationContext";
import { getAccessToken } from "../utils/cookieService";

const useFetch = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const { handleError } = useContext(NotificationContext);

  const baseUrl = import.meta.env.VITE_API_URL;

  // Create an axios instance with a base URL
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
  });
  const axiosInstanceForm = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
  });

  // Add an interceptor to the axios instance to set the Authorization header
  axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
      return config;
    },
    async (error) => {
      return await Promise.reject(error);
    },
  );

  // Add an interceptor to the axios instance to set the Authorization header for Form Data
  axiosInstanceForm.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
      return config;
    },
    async (error) => {
      return await Promise.reject(error);
    },
  );

  // Response Interceptor for Token Refresh
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Handle 403 errors for token refresh
      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loops

        try {
          const refreshResponse = await axios.post(
            `${baseUrl}/admin/refresh`,
            {},
            { withCredentials: true },
          );

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  // Response Interceptor for Token Refresh (add this also to axiosInstanceForm)
  axiosInstanceForm.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axios.post(
            `${baseUrl}/admin/refresh`,
            {},
            { withCredentials: true },
          );

          return axiosInstanceForm(originalRequest); // use the same instance
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  //custom hook for data manipulations
  const fetchAction = async ({ query, body, method = "post", params }) => {
    setFetchLoading(true);
    try {
      const response = await axiosInstance({
        url: `${baseUrl}${query}`,
        method,
        data: body,
        params,
      });
      setFetchLoading(false);
      return response.data;
    } catch (err) {
      setFetchLoading(false);
      handleError(err);
      return {
        responseType: "fail",
        message: err.response.data.message,
      };
    }
  };

  //custom hook for form data manipulations
  const fetchActionForm = async ({ query, body, method = "post", params }) => {
    setFetchLoading(true);
    try {
      const response = await axiosInstanceForm({
        url: `${baseUrl}${query}`,
        method,
        data: body,
        params,
      });
      setFetchLoading(false);
      return response.data;
    } catch (err) {
      setFetchLoading(false);
      handleError(err);
      return {
        responseType: "fail",
        message: err.response.data.message,
      };
    }
  };

  return { fetchAction, fetchActionForm, fetchLoading };
};
export default useFetch;
