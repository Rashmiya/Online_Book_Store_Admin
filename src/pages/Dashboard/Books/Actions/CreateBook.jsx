import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  Switch,
  Rate,
  Typography,
  Divider,
  Tag,
  Space,
  Radio,
  message,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  FileTextOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import BookService from "../../../../services/BookService";
import { NotificationContext } from "../../../../context/NotificationContext";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const CreateBook = ({ book, type, handleClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [bookTypes, setBookTypes] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [fileList, setFileList] = useState([]);
  const [pdfFile, setPdfFile] = useState([]);
  const inputRef = React.useRef(null);
  const { createBook, updateBook } = BookService();
  const { openNotification, handleError } = useContext(NotificationContext);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      // Append normal fields
      formData.append("bookId", book?.bookId);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("author", values.author);
      formData.append("ISBN_number", values.ISBN_number);
      formData.append("price", values.price);
      formData.append("status", values.status ? 1 : 0);
      formData.append("qty", values.qty);
      formData.append("publisher", values.publisher);
      formData.append("pub_year", values.pub_year);
      formData.append("isAwarded", values.isAwarded || false);
      formData.append("number_of_pages", values.number_of_pages);
      formData.append("format", values.format);

      // Append types array one by one
      bookTypes.forEach((type) => {
        formData.append("types[]", type);
      });
      book?.cover_images.forEach((image) => {
        formData.append("old_images[]", image);
      });
      book?.pdf_file && formData.append("old_pdf_file", book.pdf_file);
      if (
        values.cover_images &&
        values.cover_images.fileList &&
        values.cover_images.fileList.length > 0
      ) {
        values.cover_images.fileList.forEach((fileItem, index) => {
          if (fileItem.originFileObj) {
            formData.append("cover_images", fileItem.originFileObj);
          }
        });
      }

      // Handle PDF file - fix for nested file structure
      if (
        values.pdf_file &&
        values.pdf_file.fileList &&
        values.pdf_file.fileList.length > 0
      ) {
        const pdfFileItem = values.pdf_file.fileList[0];
        if (pdfFileItem.originFileObj) {
          console.log(`Appending PDF file: ${pdfFileItem.name}`);
          formData.append("pdf_file", pdfFileItem.originFileObj);
        }
      }

      console.log("Submitting book:", formData);

      const response =
        type === "EDIT"
          ? await updateBook(formData)
          : await createBook(formData);
      if (response) {
        if (response.responseType === "success") {
          form.resetFields();
          setBookTypes([]);
          handleClose();
          openNotification("success", response?.output?.message);
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
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle new tag input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !bookTypes.includes(inputValue)) {
      setBookTypes([...bookTypes, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  // Handle tag removal
  const handleTagClose = (removedTag) => {
    setBookTypes(bookTypes.filter((tag) => tag !== removedTag));
  };

  // Show tag input
  const showInput = () => {
    setInputVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (type === "EDIT") {
      setBookTypes(book.types);

      const files = book?.cover_images.map((url) => ({
        uid: url,
        name: url.split("/").pop(),
        status: "done",
        url,
      }));
      setFileList(files);

      const file = {
        uid: book?.pdf_file,
        name: book?.pdf_file?.split("/").pop(),
        status: "done",
        url: book?.pdf_file,
      };
      setPdfFile([file]);
    }
  }, [book]);

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <Title level={3} className="mb-6 text-center">
        {type === "VIEW"
          ? "Book Details"
          : type === "EDIT"
            ? "Edit Book"
            : "Create New Book"}
      </Title>

      <Form
        {...formItemLayout}
        form={form}
        name="bookForm"
        onFinish={handleSubmit}
        scrollToFirstError
        initialValues={
          type === "EDIT"
            ? {
                ...book,
              }
            : {
                status: true,
                rating: 0,
                format: "BOTH",
              }
        }
      >
        <Divider orientation="left">Basic Information</Divider>

        <Form.Item
          name="title"
          label="Book Title"
          rules={[{ required: true, message: "Please enter the book title" }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please enter the author name" }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>

        <Form.Item
          name="ISBN_number"
          label="ISBN Number"
          rules={[{ required: true, message: "Please enter ISBN number" }]}
        >
          <Input placeholder="e.g., 9780743273565" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter book description" }]}
        >
          <TextArea rows={4} placeholder="Enter book description" />
        </Form.Item>

        <Form.Item
          name="publisher"
          label="Publisher"
          rules={[{ required: true, message: "Please enter publisher name" }]}
        >
          <Input placeholder="Enter publisher name" />
        </Form.Item>

        <Form.Item
          name="pub_year"
          label="Publication Year"
          rules={[{ required: true, message: "Please enter publication year" }]}
        >
          <Input placeholder="e.g., 2023" />
        </Form.Item>

        <Form.Item
          name="number_of_pages"
          label="Number of Pages"
          rules={[{ required: true, message: "Please enter number of pages" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Divider orientation="left">Pricing & Availability</Divider>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter book price" }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            formatter={(value) =>
              `LKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/LKR\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="qty"
          label="Quantity in Stock"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="status" label="Available" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="format" label="Format">
          <Radio.Group>
            <Radio.Button value="PHYSICAL">Physical</Radio.Button>
            <Radio.Button value="DIGITAL">Digital</Radio.Button>
            <Radio.Button value="BOTH">Both</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Book Types/Categories">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {bookTypes.map((tag) => (
                <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
                  {tag}
                </Tag>
              ))}

              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={{ width: 100, height: 22 }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag onClick={showInput} style={{ borderStyle: "dashed" }}>
                  <PlusOutlined /> Add Type
                </Tag>
              )}
            </div>
            <div className="text-xs text-gray-500">
              Click "Add Type" to add book categories.
            </div>
          </Space>
        </Form.Item>

        <Divider orientation="left">Media & Ratings</Divider>

        <Form.Item name="cover_images" label="Cover Images">
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // Prevent auto-uploading
            multiple
            fileList={fileList}
            onChange={handleUploadChange}
            onPreview={(file) => {
              console.log("Previewing:", file);
            }}
            onRemove={(file) => {
              setFileList((prevList) =>
                prevList.filter((item) => item.uid !== file.uid),
              );
            }}
          >
            {fileList.length === 0 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item name="pdf_file" label="PDF File">
          <Upload className="" maxCount={1} beforeUpload={() => false}>
            <Button icon={<FileTextOutlined />}>
              {type === "EDIT" ? "Update PDF" : "Add PDF"}
            </Button>
            {type === "EDIT" && (
              <a
                className="ml-2"
                href={book?.pdf_file}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download PDF
              </a>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="isAwarded"
          label="Award Winner"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        {/* <Form.Item name="rating" label="Rating">
          <Rate allowHalf />
        </Form.Item>

        <Form.Item name="reviews" label="Reviews">
          <TextArea rows={3} placeholder="Enter reviews or comments" />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {type === "EDIT" ? "Update Book" : "Create Book"}
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBook;
