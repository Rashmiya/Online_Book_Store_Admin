import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import SkeletonComponent from "../../components/Skeleton/SkeletonComponent";
import AdminCard from "./adminCard/AdminCard";
import SignInServices from "../../services/SignInServices";
import NoDataAnim from "../../components/nodataAnim/NoDataAnim";
import CustomButton from "../../components/buttons/CustomButton";
import ActionDialog from "../../components/popups/ActionDialog";
import AddNewAdmin from "./AdminActions/AddNewAdmin";

const AdminManage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addNewAdmin, setAddNewAdmin] = useState(false);
  const { getAllAdmins } = SignInServices();
  const { openNotification, handleError } = useContext(NotificationContext);

  useEffect(() => {
    fetchAdmins();
  }, []);
  const fetchAdmins = async () => {
    setLoading(true);
    const response = await getAllAdmins();
    if (response) {
      if (response.responseType === "success") {
        setAdmins(response.output.data.admin_users);
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
    <div className="flex w-full flex-col gap-3">
      <div className="mt-5 flex w-full justify-end">
        <CustomButton
          buttonName={"Add Admin"}
          onClick={() => {
            setAddNewAdmin(true);
          }}
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
          {admins?.length !== 0 ? (
            <div className="mb-10 flex flex-col gap-3 overflow-y-hidden">
              {admins?.map((admin, index) => (
                <AdminCard admin={admin} key={index} fetchData={fetchAdmins} />
              ))}
            </div>
          ) : (
            <NoDataAnim message="No users to display." />
          )}
        </>
      )}

      <ActionDialog
        modelOpen={addNewAdmin}
        handleCancel={() => {
          setAddNewAdmin(false);
        }}
        title="Add New Admin"
      >
        <AddNewAdmin
          handleClose={() => {
            setAddNewAdmin(false);
            fetchAdmins();
          }}
        />
      </ActionDialog>
    </div>
  );
};

export default AdminManage;
