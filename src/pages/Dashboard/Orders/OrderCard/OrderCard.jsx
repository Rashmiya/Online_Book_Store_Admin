import React, { useContext, useState } from "react";
import { Typography } from "antd";
import EditIconOutline from "../../../../assets/images/svg/common/EditIconOutline";
import DeleteOutline from "../../../../assets/images/svg/common/DeleteOutline";
import SideDrawer from "../../../../components/side_drawers/SideDrawer";
import ActionDialog from "../../../../components/popups/ActionDialog";
import OrderView from "../ViewOptions/OrderView";
import OrderDeletion from "../Actions/OrderDeletion";
import UserColorProfile from "../../../../components/userColorProfile/UserColorProfile";
import {
  formatDateMonthYear,
  formatTimeTo12Hour,
} from "../../../../helpers/DateFormatHelper";
import StatusLabel from "../../../../components/statusLabel/StatusLabel";
import { ORDER_STATUS } from "../../../../enums/Order";
import CustomButton from "../../../../components/buttons/CustomButton";
import ProceedOrder from "../Actions/ProceedOrder";
import OrderContext from "../../../../context/OrderContext";

const { Text } = Typography;

const OrderCard = ({ order, fetchData }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteOrder, setOpenDeleteOrder] = useState(false);
  const [openEditOrder, setOpenEditOrder] = useState(false);
  const [proceedOrder, setProceedOrder] = useState(false);
  const { isStatusUpdated, setIsStatusUpdated } = useContext(OrderContext);

  return (
    <>
      <div className="border-secondarySix hover:border-secondaryFour flex cursor-pointer flex-col gap-2 rounded-md border py-1 md:px-4">
        <div className="flex flex-col items-start xsm:flex-row md:items-center">
          <div
            className="flex w-full flex-row items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDrawer(true);
            }}
          >
            {order?.customer?.username && (
              <UserColorProfile
                name={order?.customer?.username}
                color={"Blue"}
                size="30px"
                textSize="12px"
              />
            )}

            <div className="flex flex-1 flex-col md:w-[90%] md:flex-row">
              <div className="flex w-full items-center justify-start px-2 md:w-1/6">
                <Text className="block truncate text-xs font-semibold md:text-sm">
                  {order?.customer?.email}
                </Text>
              </div>
              <div className="flex w-full items-center justify-start px-2 md:w-1/6">
                <Text className="text-secondaryThree text-xxs font-normal md:text-xs lg:text-sm">
                  {order?.phoneNumber}
                </Text>
              </div>
              <div className="flex w-full items-center justify-start px-2 md:w-1/6">
                <Text className="text-secondaryThree block flex items-center gap-1 truncate text-xxs font-normal md:text-xs lg:text-sm">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#939292" />
                  </svg>
                  {formatDateMonthYear(order?.createdAt)},{"  "}
                  {formatTimeTo12Hour(order?.createdAt)}
                </Text>
              </div>
              <div className="flex w-full items-center justify-start px-2 md:w-1/6 md:justify-center">
                <Text className="text-secondaryTwo block truncate text-xs font-normal md:text-sm">
                  <StatusLabel status={ORDER_STATUS[order?.status]} />
                </Text>
              </div>
              <div className="flex w-full items-center justify-start px-2 md:w-1/6 md:justify-center">
                <Text className="text-secondaryTwo block truncate text-xs font-normal md:text-sm">
                  Rs.{order?.totalAmount}
                </Text>
              </div>
              <div className="flex h-full items-center justify-start gap-4 px-2 md:w-1/6 md:justify-end">
                <CustomButton
                  className="flex text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProceedOrder(true);
                  }}
                  size="small"
                  buttonName={"Proceed"}
                />
                <DeleteOutline
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeleteOrder(true);
                  }}
                  className="flex w-[26px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {openDrawer && (
        <SideDrawer
          open={openDrawer}
          handleClose={() => setOpenDrawer(false)}
          width={"900px"}
        >
          <OrderView data={order} fetchData={fetchData} />
        </SideDrawer>
      )}

      <ActionDialog
        modelOpen={openDeleteOrder}
        handleCancel={() => setOpenDeleteOrder(false)}
        title="Delete Order"
      >
        <OrderDeletion
          order={order}
          handleClose={() => {
            setOpenDeleteOrder(false);
            fetchData();
          }}
        />
      </ActionDialog>

      {/* Proceed Order */}
      {proceedOrder && (
        <SideDrawer
          open={proceedOrder}
          handleClose={() => {
            setProceedOrder(false);
            if (isStatusUpdated) fetchData();
          }}
          width={"900px"}
        >
          <ProceedOrder
            order={order}
            handleClose={() => {
              setProceedOrder(false);
              fetchOrders();
            }}
          />
        </SideDrawer>
      )}
    </>
  );
};

export default OrderCard;
