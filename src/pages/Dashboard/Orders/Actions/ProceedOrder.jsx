import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  List,
  Divider,
  Typography,
  Steps,
  Button,
  Space,
  message,
  Skeleton,
} from "antd";
import OrderService from "../../../../services/OrderService";
import { NotificationContext } from "../../../../context/NotificationContext";
import StatusLabel from "../../../../components/statusLabel/StatusLabel";
import { ORDER_STATUS } from "../../../../enums/Order";
import OrderContext from "../../../../context/OrderContext";

const { Title, Text } = Typography;
const { Step } = Steps;

const statusEnum = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const ProceedOrder = ({ order }) => {
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { openNotification, handleError } = useContext(NotificationContext);
  const { isStatusUpdated, setIsStatusUpdated } = useContext(OrderContext);

  const { getOrderById, updateOrderStatus } = OrderService();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);
    const data = {
      orderId: order.orderId,
    };
    const response = await getOrderById(data);
    if (response) {
      if (response.responseType === "success") {
        setData(response.output.data);
        setStatus(response.output.data.status);
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

  const handleStatusUpdate = async (nextStatus) => {
    setLoading(true);
    const data = {
      orderId: order.orderId,
      status: nextStatus,
    };
    const response = await updateOrderStatus(data);
    if (response) {
      if (response.responseType === "success") {
        setIsStatusUpdated(true);
        openNotification("success", response?.output?.message);
        await fetchOrderDetails();
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

  const getCurrentStep = () => {
    return statusEnum.indexOf(status);
  };

  const getNextStatus = () => {
    const index = statusEnum.indexOf(status);
    return statusEnum[index + 1];
  };

  const renderActions = () => {
    if (status === "cancelled" || status === "delivered") return null;

    return (
      <Space>
        {getNextStatus() && (
          <Button
            type="primary"
            onClick={() => handleStatusUpdate(getNextStatus())}
          >
            Mark as {getNextStatus()}
          </Button>
        )}
        {status !== "cancelled" && status !== "delivered" && (
          <Button danger onClick={() => handleStatusUpdate("cancelled")}>
            Cancel Order
          </Button>
        )}
      </Space>
    );
  };

  return (
    <>
      {loading ? (
        <div className="flex h-full w-full flex-col">
          <Skeleton
            active
            paragraph={false}
            className="mt-6 flex w-1/2 justify-start"
          />
          <Skeleton.Image active className="m-5 h-48 rounded-full" />
          <Skeleton active className="mt-2 flex justify-start" />
          <Skeleton active className="mt-4 flex justify-start" />
        </div>
      ) : (
        <Card
          title={<Title level={3}>Order Management</Title>}
          style={{ maxWidth: 900, margin: "auto" }}
        >
          {/* Status Stepper */}
          <Steps
            current={getCurrentStep()}
            status={status === "cancelled" ? "error" : "process"}
          >
            {statusEnum.map((step) => (
              <Step
                key={step}
                title={step.charAt(0).toUpperCase() + step.slice(1)}
              />
            ))}
          </Steps>

          <Divider />

          {/* Customer Info */}
          <Descriptions title="Customer Info" bordered column={1} size="middle">
            <Descriptions.Item label="Name">
              {data?.customer_id?.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {data?.customer_id?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {data?.phoneNumber}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Shipping Address */}
          <Descriptions
            title="Shipping Address"
            bordered
            column={1}
            size="middle"
          >
            <Descriptions.Item label="Street Address">
              {data?.shippingAddress?.address}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {data?.shippingAddress?.city}
            </Descriptions.Item>
            <Descriptions.Item label="Postal Code">
              {data?.shippingAddress?.postalCode}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {data?.shippingAddress?.country}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Order Details */}
          <Title level={5}>Ordered Items</Title>
          <List
            bordered
            dataSource={data?.order_details}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item?.book_id?.title}
                  description={`Author: ${item.book_id?.author}`}
                />
                <div>
                  <Text>Qty: {item?.qty}</Text> <br />
                  <Text>Price: Rs. {item?.price}</Text>
                </div>
              </List.Item>
            )}
          />

          <Divider />

          {/* Summary */}
          <Descriptions title="Summary" bordered column={1} size="middle">
            <Descriptions.Item label="Total Amount">
              Rs. {data?.totalAmount}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {data?.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              {data?.paymentStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(data?.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Current Status">
              {/* <Text strong>{data?.status?.toUpperCase()}</Text> */}
              <div className="flex w-full items-center justify-start">
                <StatusLabel status={ORDER_STATUS[data?.status]} />
              </div>
            </Descriptions.Item>
          </Descriptions>

          {/* Action Buttons */}
          <Card style={{ marginTop: 24 }} bodyStyle={{ textAlign: "right" }}>
            {renderActions()}
          </Card>
        </Card>
      )}
    </>
  );
};

export default ProceedOrder;
