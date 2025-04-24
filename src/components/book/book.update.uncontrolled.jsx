import Modal from "antd/es/modal/Modal";
import { Input, Select, App as AppAntd, Form } from "antd";
import { useState, useEffect } from "react";
import { handleUploadFile, updateBookAPI } from "../services/service.book";
const UpdateBookUncontrolled = (props) => {
  const {
    dataUpdateBook,
    setIsModalOpenUpdateBook,
    isModalOpenUpdateBook,
    loadbook,
  } = props;
  const { notification } = AppAntd.useApp();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await handleUpdateBook(values);
  };
  const handleUpdateBook = async (values) => {
    let newthumbnail = "";
    // không có file và preview => không upload
    if (!selectedFile && !preview) {
      notification.error({
        message: "Upload error",
        description: "cập nhật book không thành công",
      });
      return;
    } else {
      //có ảnh preview và có file => upload
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        //success
        newthumbnail = resUpload.data.fileUploaded;
      } else {
        //failed
        notification.error({
          message: "Upload error",
          description: "cập nhật book không thành công",
        });
        return;
      }
    }
    // không có file và có ảnh preview => không upload
    if (!selectedFile && preview) {
      newthumbnail = dataUpdateBook.thumbnail;
    }
    await updateBook(newthumbnail, values);
  };
  const updateBook = async (newThumbnail, values) => {
    const res = await updateBookAPI(
      dataUpdateBook._id,
      newThumbnail,
      values.mainText,
      values.author,
      values.price,
      values.quantity,
      values.category
    );
    if (res.data) {
      notification.success({
        message: "Update success",
        description: "cập nhật book thành công",
      });
    } else {
      notification.error({
        message: "Update error",
        description: "cập nhật book không thành công",
      });
    }
    handleCancel();
  };
  const handleCancel = () => {
    setIsModalOpenUpdateBook(false);
    resetBook();
    loadbook();
  };
  const resetBook = () => {
    // form.resetFields();
    dataUpdateBook(null);
    setPreview(null);
    setSelectedFile(null);
    setIsModalOpenUpdateBook(false);
  };
  const options = [
    {
      value: "Arts",
      label: "Arts",
    },
    {
      value: "Business",
      label: "Business",
    },
    {
      value: "Comics",
      label: "Comics",
    },
    {
      value: "Cooking",
      label: "Cooking",
    },
    {
      value: "Entertainment",
      label: "Entertainment",
    },
    {
      value: "History",
      label: "History",
    },
    {
      value: "Music",
      label: "Music",
    },
    {
      value: "Sports",
      label: "Sports",
    },
    {
      value: "Teen",
      label: "Teen",
    },
    {
      value: "Travel",
      label: "Travel",
    },
  ];
  useEffect(() => {
    if (dataUpdateBook && dataUpdateBook._id) {
      console.log(">>> check thumbnail", dataUpdateBook);
      form.setFieldsValue({
        mainText: dataUpdateBook.mainText,
        author: dataUpdateBook.author,
        price: dataUpdateBook.price,
        quantity: dataUpdateBook.quantity,
        category: dataUpdateBook.category,
        thumbnail: dataUpdateBook.thumbnail,
      });
    }
  }, [dataUpdateBook]);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      selectedFile(null);
      setPreview(null);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <Modal
        title="Update Book"
        open={isModalOpenUpdateBook}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Chủ đề"
            name="mainText"
            rules={[
              {
                required: true,
                message: "Please input your main text!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tác giả"
            name="author"
            rules={[
              {
                required: true,
                message: "Please input your author!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input your quantity!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thể loại"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your category!",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              name="category"
              options={options}
            />
          </Form.Item>
          <div
            style={{
              marginTop: "10px",
              height: "100px",
              width: "150px",
            }}
          >
            {dataUpdateBook?.thumbnail && (
              <>
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    dataUpdateBook.thumbnail
                  }`}
                />
              </>
            )}
          </div>
          <div>
            <label
              htmlFor="btnupload"
              style={{
                display: "block",
                width: "fit-content",
                marginTop: "15px",
                padding: "5px 10px",
                background: "orange",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload Avatar
            </label>
            <input
              type="file"
              hidden
              id="btnupload"
              onChange={(event) => handleOnChangeFile(event)}
              style={{ display: "none" }}
            />
          </div>
          <div
            style={{
              marginTop: "10px",
              height: "100px",
              width: "150px",
            }}
          >
            {preview && (
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={preview}
              />
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateBookUncontrolled;
