import { Button, Select, Space } from "antd";
import React, { useContext, useState } from "react";
import OrderService from "../../../../services/OrderService";
import { NotificationContext } from "../../../../context/NotificationContext";
import LoadingAnim from "../../../../components/loader/LoadingAnim";
const { Option } = Select;
const ChangePaymentStatus = ({ handleClose, order }) => {
  const PAYMENT_STATUSES = ["pending", "completed", "failed", "refunded"];
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updatePaymentStatus } = OrderService();
  const { openNotification, handleError } = useContext(NotificationContext);

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleSave = async () => {
    setLoading(true);
    const data = {
      orderId: order.orderId,
      paymentStatus: status,
    };
    const response = await updatePaymentStatus(data);
    if (response) {
      if (response.responseType === "success") {
        handleClose();
        setLoading(false);
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
        setLoading(false);
      } else if (response.responseType === "error") {
        handleError(response.output);
        setLoading(false);
      }
    } else {
      openNotification("error", "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingAnim />
      ) : (
        <div className="flex w-full flex-col mt-2 items-center justify-center gap-4">
          <Select
            placeholder="Select new payment status"
            onChange={handleStatusChange}
            value={status}
            className="w-full"
          >
            {PAYMENT_STATUSES.map((status) => (
              <Option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Option>
            ))}
          </Select>

          <Button type="primary" onClick={handleSave} disabled={!status}>
            Save
          </Button>
        </div>
      )}
    </>
  );
};

export default ChangePaymentStatus;
