import React, { useContext } from "react";
import { NotificationContext } from "../../../../context/NotificationContext";
import BookService from "../../../../services/BookService";
import { Typography } from "antd";
import CustomButton from "../../../../components/buttons/CustomButton";
const { Text, Title } = Typography;
const BookDeletion = ({ book, handleClose }) => {
  const { openNotification, handleError } = useContext(NotificationContext);
  const { deleteBook } = BookService();

  const handleSubmit = async () => {
    const data = {
      bookId: book?.bookId,
    };
    const response = await deleteBook(data);
    if (response) {
      if (response.responseType === "success") {
        openNotification("success", response?.output?.message);
        handleClose();
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
      } else if (response.responseType === "error") {
        handleError(response.output);
      }
    } else {
      openNotification("error", "Something went wrong");
    }
  };
  return (
    <div className="m-4 flex flex-col items-center justify-center">
      <>
        <Text className="flex text-center !text-xs font-normal md:!text-sm">
          Are you sure you want to delete book from the company?
        </Text>
        <Title
          level={1}
          className="flex text-center !text-xs font-semibold !text-primary md:!text-sm"
        >
          {book?.title}
        </Title>
        <Text className="flex text-center !text-xs font-normal md:!text-sm">
          Deleting this book from the company will remove it from all the orders
        </Text>
        <CustomButton
          type="primary"
          className="mt-4"
          onClick={handleSubmit}
          buttonName="Delete Book"
        />
      </>
    </div>
  );
};

export default BookDeletion;
