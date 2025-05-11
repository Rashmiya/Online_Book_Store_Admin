import React from "react";
import useFetch from "../hooks/useFetch";

const BookService = () => {
  const { fetchAction, fetchActionForm } = useFetch();

  const handleResponse = (response) => {
    if (response?.success) {
      return { responseType: "success", output: response };
    } else {
      return { responseType: "fail", output: response };
    }
  };

  // Create a new book
  const createBook = async (data) => {
    try {
      const response = await fetchActionForm({
        query: "/book/create",
        method: "post",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Get all books with optional filtering and pagination
  const getAllBooks = async (data) => {
    try {
      const response = await fetchAction({
        query: "/book/all",
        method: "get",
        params: {
          page: data?.page || 1,
          perPage: data?.perPage || 10,
          sort: data?.sort || 1,
          bookName: data?.bookName || "",
          ISBN_number: data?.ISBN_number || "",
          searchTerm: data?.searchTerm || "",
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Get a single book by ID
  const getBookById = async (data) => {
    try {
      const response = await fetchAction({
        query: "/book/view",
        method: "get",
        params: {
          bookId: data?.bookId || 0,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Update a book
  const updateBook = async (data) => {
    try {
      const response = await fetchActionForm({
        query: "/book/update",
        method: "put",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Delete a book
  const deleteBook = async (data) => {
    try {
      const response = await fetchAction({
        query: "/book/delete",
        method: "delete",
        params: {
          bookId: data?.bookId || 0,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  // Search books by title, author, or genre
  const searchBooks = async (data) => {
    try {
      const response = await fetchAction({
        query: "/book/search",
        method: "get",
        params: {
          query: data?.query || "",
          field: data?.field || "all", // all, title, author, genre
          page: data?.page || 1,
          perPage: data?.perPage || 10,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  return {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks,
  };
};

export default BookService;
