import React from "react";
import { Card, Descriptions, List, Divider, Typography } from "antd";
import { ORDER_STATUS } from "../../../../enums/Order";
import StatusLabel from "../../../../components/statusLabel/StatusLabel";

const { Title, Text } = Typography;

const OrderView = ({ data }) => {
  const {
    customer,
    order_details,
    totalAmount,
    status,
    shippingAddress,
    phoneNumber,
    paymentMethod,
    paymentStatus,
    createdAt,
  } = data;
  console.log(data);
  return (
    <Card title={<Title level={3}>Order Details</Title>} className="w-full">
      {/* Customer Information */}
      <Descriptions
        title="Customer Information"
        bordered
        column={1}
        size="middle"
      >
        <Descriptions.Item label="Name">{customer.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {phoneNumber}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Shipping Information */}
      <Descriptions title="Shipping Address" bordered column={1} size="middle">
        <Descriptions.Item label="Street Address">
          {shippingAddress.address}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {shippingAddress.city}
        </Descriptions.Item>
        <Descriptions.Item label="Postal Code">
          {shippingAddress.postalCode}
        </Descriptions.Item>
        <Descriptions.Item label="Country">
          {shippingAddress.country}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Order Items */}
      <Title level={5}>Items Ordered</Title>
      <List
        bordered
        itemLayout="vertical"
        dataSource={order_details}
        renderItem={(item) => (
          <List.Item key={item?.book?.bookId}>
            <List.Item.Meta
              title={item?.book?.title}
              description={`Author: ${item?.book?.author}`}
            />
            <div>
              <Text>Qty: {item?.qty}</Text> <br />
              <Text>Price: Rs. {item?.price}</Text>
            </div>
          </List.Item>
        )}
      />

      <Divider />

      {/* Order Summary */}
      <Descriptions title="Order Summary" bordered column={1} size="middle">
        <Descriptions.Item label="Total Amount">
          Rs. {totalAmount}
        </Descriptions.Item>
        <Descriptions.Item label="Order Status">
          {" "}
          <div className="w-full flex items-center justify-start">
            <StatusLabel status={ORDER_STATUS[status]} />
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Payment Method">
          {paymentMethod}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Status">
          {paymentStatus}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(createdAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default OrderView;
