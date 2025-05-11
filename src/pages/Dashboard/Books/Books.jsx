import React, { useContext, useEffect, useState } from "react";
import SkeletonComponent from "../../../components/Skeleton/SkeletonComponent";
import NoDataAnim from "../../../components/nodataAnim/NoDataAnim";
import { Input, Pagination } from "antd";
import CustomButton from "../../../components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import ActionDialog from "../../../components/popups/ActionDialog";
import { NotificationContext } from "../../../context/NotificationContext";
import SearchOutline from "../../../assets/images/svg/common/SearchOutline";
import BookService from "../../../services/BookService";
import BookCard from "./BookCard/BookCard";
import BookContext from "../../../context/BookContext";
import SideDrawer from "../../../components/side_drawers/SideDrawer";
import CreateBook from "./Actions/CreateBook";

const Books = () => {
  const [loading, setLoading] = useState(false);
  const [addNewBookDrawer, setAddNewBookDrawer] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [books, setBooks] = useState([]);
  const { filters, updateFilters } = useContext(BookContext);
  const { openNotification, handleError } = useContext(NotificationContext);
  const [pagination, setPagination] = useState({
    page: 1,
    totalCount: 0,
    perPage: 10,
  });
  const { getAllBooks } = BookService();
  const navigateTo = useNavigate();
  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    setLoading(true);
    const response = await getAllBooks(filters);
    if (response) {
      if (response.responseType === "success") {
        setBookData(response.output.data);
        setBooks(response.output.data.books);

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
  const handleSearchBook = (e) => {
    updateFilters({ searchTerm: e.target.value });
  };
  return (
    <div className="h-full w-full p-2">
      <div className="mt-5 flex h-fit flex-col !overflow-y-hidden">
        <div className="flex w-full justify-between pb-3">
          <div>
            <Input
              className="w-[300px]"
              size="default"
              placeholder="Search Books"
              maxLength={60}
              suffix={<SearchOutline className="flex w-[20px]" />}
              onChange={handleSearchBook}
            />
          </div>
          <CustomButton
            type="primary"
            className="mb-4"
            onClick={() => {
              setAddNewBookDrawer(true);
            }}
            buttonName={"Add New Book"}
          />
        </div>
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonComponent key={index} />
            ))}
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            {books?.length !== 0 ? (
              <div className="mb-4 flex flex-col gap-3 overflow-y-hidden">
                {books?.map((book, index) => (
                  <BookCard book={book} key={index} fetchData={fetchBooks} />
                ))}
              </div>
            ) : (
              <NoDataAnim message="No users to display." />
            )}
          </div>
        )}
        <div className="bottom-0 left-0 z-50 flex w-full justify-end px-4 py-2 md:px-12">
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
        {addNewBookDrawer && (
          <SideDrawer
            open={addNewBookDrawer}
            handleClose={() => {
              setAddNewBookDrawer(false);
            }}
            width={"900px"}
          >
            <CreateBook
              type={"CREATE"}
              handleClose={() => {
                setAddNewBookDrawer(false);
                fetchBooks();
              }}
            />
          </SideDrawer>
        )}
        {/* <ActionDialog
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
        </ActionDialog> */}
      </div>
    </div>
  );
};

export default Books;
