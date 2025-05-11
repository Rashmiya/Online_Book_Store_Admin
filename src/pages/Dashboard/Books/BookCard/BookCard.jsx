import React, { useState } from "react";
import { Popover, Typography } from "antd";
import UserColorProfile from "../../../../components/userColorProfile/UserColorProfile";
import EditIconOutline from "../../../../assets/images/svg/common/EditIconOutline";
import DeleteOutline from "../../../../assets/images/svg/common/DeleteOutline";
import SideDrawer from "../../../../components/side_drawers/SideDrawer";
import User from "../../../../assets/images/svg/common/User";
import ActionDialog from "../../../../components/popups/ActionDialog";
import BookView from "../BookView/BookView";
import BookDeletion from "../Actions/BookDeletion";
import CreateBook from "../Actions/CreateBook";
const { Text } = Typography;

const BookCard = ({ book, fetchData }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteBook, setOpenDeleteBook] = useState(false);
  const [openEditBook, setOpenEditBook] = useState(false);

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
            <UserColorProfile
              name={book?.title}
              color={"Green"}
              size="30px"
              textSize="12px"
            />

            <div className="flex flex-1 flex-col md:w-[90%] md:flex-row">
              <div className="flex w-full items-center justify-start px-2 md:w-1/6">
                <Text className="block truncate text-xs font-semibold md:text-sm">
                  {book?.title?.length > 35
                    ? book?.title.substring(0, 35) + "..."
                    : book?.title}
                </Text>
              </div>
              <div className="flex w-full items-center justify-start px-2 md:w-1/6">
                <div className="flex w-full flex-row items-center gap-2">
                  <Text className="text-secondaryThree flex flex-row items-center gap-1 text-xxs font-normal md:text-xs lg:text-sm">
                    {book?.author}
                  </Text>
                </div>
              </div>
              <div className="flex w-full items-center justify-start px-2 md:w-1/6">
                <Text className="text-secondaryThree flex flex-row items-center gap-1 text-xxs font-normal md:text-xs lg:text-sm">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#939292" />
                  </svg>
                  Qty : {book?.qty}
                </Text>
              </div>
              <div className="flex w-full items-center justify-start px-2 md:w-1/6">
                <Text className="text-secondaryTwo block flex items-center gap-2 truncate text-xs font-normal md:text-sm">
                  ISBN : {book?.ISBN_number}
                </Text>
              </div>
              <div className="flex w-full items-center justify-start px-2 md:w-1/6 md:justify-end">
                <Text className="text-secondaryTwo flex w-full items-center justify-end gap-2 text-xs font-normal md:text-sm">
                  <span className="flex w-[50%] justify-end font-semibold">
                    Rs.
                  </span>
                  <span className="flex w-[50%] justify-start font-semibold block truncate">
                    {book?.price}
                  </span>
                </Text>
              </div>
              <div className="flex h-full items-center justify-start gap-4 px-2 md:w-1/6 md:justify-end">
                <EditIconOutline
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenEditBook(true);
                  }}
                  className="flex w-[20px]"
                />
                <DeleteOutline
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeleteBook(true);
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
          handleClose={() => {
            setOpenDrawer(false);
          }}
          width={"900px"}
          title={"Book Details"}
        >
          <BookView book={book} fetchData={fetchData} />
          {/* <CreateBook book={book} type={"VIEW"} /> */}
        </SideDrawer>
      )}

      {openEditBook && (
        <SideDrawer
          open={openEditBook}
          handleClose={() => {
            setOpenEditBook(false);
          }}
          width={"900px"}
        >
          <CreateBook
            book={book}
            type={"EDIT"}
            handleClose={() => {
              fetchData();
              setOpenEditBook(false);
            }}
          />
        </SideDrawer>
      )}
      <ActionDialog
        modelOpen={openDeleteBook}
        handleCancel={() => {
          setOpenDeleteBook(false);
        }}
        title="Delete Book"
      >
        <BookDeletion
          book={book}
          handleClose={() => {
            setOpenDeleteBook(false);
            fetchData();
          }}
        />
      </ActionDialog>
    </>
  );
};

export default BookCard;
