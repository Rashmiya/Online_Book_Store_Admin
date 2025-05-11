import React, { useContext } from "react";
import CustomButton from "../../../../components/buttons/CustomButton";
import OrderService from "../../../../services/OrderService";
import { NotificationContext } from "../../../../context/NotificationContext";
import { Typography } from "antd";
const { Text, Title } = Typography;

const OrderDeletion = ({ order, handleClose }) => {
  const { deleteOrder } = OrderService();
  const { openNotification, handleError } = useContext(NotificationContext);

  const handleSubmit = async () => {
    const data = {
      orderId: order?.orderId,
    };
    const response = await deleteOrder(data);
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
        <Text className="flex gap-2 text-center !text-xs font-normal md:!text-sm">
          Are you sure you want to delete this order made by{" "}
          <span className="font-semibold text-primary">
            {"  "}
            {order?.customer?.username} ?
          </span>
        </Text>

        <Text className="flex text-center !text-xs font-normal md:!text-sm">
          Deleting this order from the company will remove it from the list.
        </Text>
        <CustomButton
          type="primary"
          className="mt-4"
          onClick={handleSubmit}
          buttonName="Delete Order"
        />
      </>
    </div>
  );
};

export default OrderDeletion;
