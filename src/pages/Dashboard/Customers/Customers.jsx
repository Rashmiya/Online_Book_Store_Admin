import React, { useContext, useEffect, useState } from "react";
import SkeletonComponent from "../../../components/Skeleton/SkeletonComponent";
import NoDataAnim from "../../../components/nodataAnim/NoDataAnim";
import UserCard from "./userCard/UserCard";
import SignInServices from "../../../services/SignInServices";
import { UserContext } from "../../../context/UserContext";
import { Input, Pagination } from "antd";
import CustomButton from "../../../components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import ActionDialog from "../../../components/popups/ActionDialog";
import AdminManage from "../../AdminManage/AdminManage";
import { NotificationContext } from "../../../context/NotificationContext";
import SearchOutline from "../../../assets/images/svg/common/SearchOutline";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [adminMangeModal, setAdminMangeModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const { filters, updateFilters } = useContext(UserContext);
  const { openNotification, handleError } = useContext(NotificationContext);
  const [activeUserCount, setActiveUserCount] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    totalCount: 0,
    perPage: 10,
  });
  const { getAllUsers } = SignInServices();
  const navigateTo = useNavigate();
  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await getAllUsers(filters);
    if (response) {
      if (response.responseType === "success") {
        setUserData(response.output.data);
        setUsers(response.output.data.customers);

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
  const handleTemplateChange = (e) => {
    updateFilters({ customerName: e.target.value });
  };
  return (
    <div className="h-full w-full p-2">
      {/* users list */}
      <div className="mb-10 mt-5 flex h-[90vh] flex-col overflow-y-auto">
        <div className="flex w-full justify-between pb-3">
          <div>
            <Input
              className="w-[300px]"
              size="default"
              placeholder="Search Customers"
              maxLength={60}
              suffix={<SearchOutline className="flex w-[20px]" />}
              onChange={handleTemplateChange}
            />
          </div>
          <CustomButton
            type="primary"
            className="mb-4"
            onClick={() => {
              setAdminMangeModal(true);
            }}
            buttonName={"Manage Admin"}
          />
        </div>
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonComponent key={index} />
            ))}
          </div>
        ) : (
          <>
            {users?.length !== 0 ? (
              <div className="mb-10 flex flex-col gap-3 overflow-y-hidden">
                {users?.map((user, index) => (
                  <UserCard
                    user={user}
                    key={index}
                    fetchData={fetchUsers}
                    activeUserCount={activeUserCount}
                  />
                ))}
              </div>
            ) : (
              <NoDataAnim message="No users to display." />
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
        <ActionDialog
          modelOpen={adminMangeModal}
          handleCancel={() => {
            setAdminMangeModal(false);
          }}
          title="Manage Admin"
          size={"900px"}
        >
          <AdminManage
            handleClose={() => {
              setAdminMangeModal(false);
            }}
          />
        </ActionDialog>
      </div>
    </div>
  );
};

export default Customers;
