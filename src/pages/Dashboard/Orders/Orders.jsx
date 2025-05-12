import React, { useContext, useEffect, useState } from "react";
import SkeletonComponent from "../../../components/Skeleton/SkeletonComponent";
import NoDataAnim from "../../../components/nodataAnim/NoDataAnim";
import { Input, Pagination } from "antd";
import CustomButton from "../../../components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../../context/NotificationContext";
import SearchOutline from "../../../assets/images/svg/common/SearchOutline";
import OrderService from "../../../services/OrderService";
import SideDrawer from "../../../components/side_drawers/SideDrawer";
import OrderContext from "../../../context/OrderContext";
import OrderCard from "./OrderCard/OrderCard";
import ProceedOrder from "./Actions/ProceedOrder";
import ActionDialog from "../../../components/popups/ActionDialog";
import ViewCart from "./ViewOptions/ViewCart";
import WishListContent from "./Actions/WishListContent";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [checkWishList, setCheckWishList] = useState(false);
  const [checkCart, setCheckCart] = useState(false);

  const [orderData, setOrderData] = useState(null);
  const [orders, setOrders] = useState([]);
  const { filters, updateFilters, setIsStatusUpdated } =
    useContext(OrderContext);
  const { openNotification, handleError } = useContext(NotificationContext);
  const [pagination, setPagination] = useState({
    page: 1,
    totalCount: 0,
    perPage: 10,
  });
  const { getAllOrders } = OrderService();

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    setLoading(true);
    const response = await getAllOrders(filters);
    if (response) {
      if (response.responseType === "success") {
        setOrderData(response.output.data);
        setOrders(response.output.data.orders);
        setIsStatusUpdated(false);
        setPagination((prevFilters) => ({
          ...prevFilters,
          page: response.output.data.page,
          totalCount: response.output.data.totalCount,
        }));
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

  const onPageChange = (page, pageSize) => {
    setPagination((prevFilters) => ({
      ...prevFilters,
      perPage: pageSize,
    }));
    updateFilters({ page: page, perPage: pageSize });
  };

  const handleSearchChange = (e) => {
    updateFilters({ searchTerm: e.target.value });
  };

  return (
    <div className="h-full w-full p-2">
      <div className="mb-10 mt-5 flex h-[90vh] flex-col overflow-y-auto">
        <div className="flex w-full justify-between pb-3">
          <div>
            <Input
              className="w-[300px]"
              size="default"
              placeholder="Search Orders"
              maxLength={60}
              suffix={<SearchOutline className="flex w-[20px]" />}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-row gap-2">
            <CustomButton
              type="primary"
              className="mb-4"
              onClick={() => {
                setCheckWishList(true);
              }}
              buttonName={"Check Wishlist"}
            />
            <CustomButton
              className="mb-4"
              onClick={() => {
                setCheckCart(true);
              }}
              buttonName={"Cart"}
            />
          </div>
        </div>
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonComponent key={index} />
            ))}
          </div>
        ) : (
          <>
            {orders?.length !== 0 ? (
              <div className="mb-10 flex flex-col gap-3 overflow-y-hidden">
                {orders?.map((order, index) => (
                  <OrderCard
                    order={order}
                    key={index}
                    fetchData={fetchOrders}
                  />
                ))}
              </div>
            ) : (
              <NoDataAnim message="No orders to display." />
            )}
          </>
        )}
        <div className="fixed bottom-0 left-0 z-50 flex w-full justify-end bg-white p-4 px-4 md:px-12">
          {pagination.totalCount > 10 && (
            <Pagination
              current={pagination.page}
              onChange={onPageChange}
              total={pagination?.totalCount}
              showSizeChanger={true}
              pageSize={pagination?.perPage}
            />
          )}
        </div>

        {/* Check Wish List */}
        {checkWishList && (
          <SideDrawer
            open={checkWishList}
            handleClose={() => {
              setCheckWishList(false);
            }}
            width={"900px"}
          >
            <WishListContent
              handleClose={() => {
                setCheckWishList(false);
              }}
            />
          </SideDrawer>
        )}

        {/* Check Cart */}
        <ActionDialog
          modelOpen={checkCart}
          handleCancel={() => {
            setCheckCart(false);
          }}
          title="View Cart"
          size={"900px"}
        >
          <ViewCart
            handleClose={() => {
              setCheckCart(false);
            }}
          />
        </ActionDialog>
      </div>
    </div>
  );
};

export default Orders;
