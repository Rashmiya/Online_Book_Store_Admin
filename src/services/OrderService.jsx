import React from "react";
import useFetch from "../hooks/useFetch";

const OrderService = () => {
  const { fetchAction } = useFetch();

  const handleResponse = (response) => {
    if (response?.success) {
      return { responseType: "success", output: response };
    } else {
      return { responseType: "fail", output: response };
    }
  };

  // Get all orders with optional filtering and pagination
  const getAllOrders = async (data) => {
    try {
      const response = await fetchAction({
        query: "/order/all",
        method: "get",
        params: {
          page: data?.page || 1,
          perPage: data?.perPage || 10,
          sort: data?.sort || 1,
          searchTerm: data?.searchTerm || "",
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Get a single order by ID
  const getOrderById = async (data) => {
    try {
      const response = await fetchAction({
        query: "/order/find",
        method: "get",
        params: {
          orderId: data?.orderId || 0,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Delete an order
  const deleteOrder = async (data) => {
    try {
      const response = await fetchAction({
        query: "/order/delete",
        method: "delete",
        params: {
          orderId: data?.orderId || 0,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Get all orders for a specific user
  const getUserOrders = async (data) => {
    try {
      const response = await fetchAction({
        query: "/order/user-orders",
        method: "get",
        params: {
          userId: data?.userId || 0,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Create a new order
  const createOrder = async (data) => {
    try {
      const response = await fetchAction({
        query: "/order/create",
        method: "post",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Update order status
  const updateOrderStatus = async (data) => {
    try {
      const response = await fetchAction({
        query: "/order/update-status",
        method: "put",
        body: {
          orderId: data?.orderId || 0,
          status: data?.status || "",
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Update payment status
  const updatePaymentStatus = async (data) => {
    try {
      const response = await fetchAction({
        query: "/order/update-payment",
        method: "put",
        body: {
          orderId: data?.orderId || 0,
          paymentStatus: data?.paymentStatus || "",
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  return {
    getAllOrders,
    getOrderById,
    deleteOrder,
    getUserOrders,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
  };
};

export default OrderService;
