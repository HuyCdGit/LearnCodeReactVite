import Modal from "antd/es/modal/Modal";
import { Input, Select, App as AppAntd } from "antd";
import { useState, useEffect } from "react";
import { handleUploadFile, updateBookAPI } from "../services/service.book";
const UpdateBook = (props) => {
  const {
    dataUpdateBook,
    setIsModalOpenUpdateBook,
    isModalOpenUpdateBook,
    loadbook,
  } = props;
  const { notification } = AppAntd.useApp();
  const [thumbnail, setThumbnail] = useState();
  const [mainText, setMainText] = useState();
  const [author, setAuthor] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState();
  const handleUpdateBook = async () => {
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
    await updateBook(newthumbnail);
  };
  const updateBook = async (newThumbnail) => {
    const res = await updateBookAPI(
      dataUpdateBook._id,
      newThumbnail,
      mainText,
      author,
      price,
      quantity,
      category
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
    setPreview(null);
    setSelectedFile(null);
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
    if (dataUpdateBook) {
      setMainText(dataUpdateBook.mainText);
      setAuthor(dataUpdateBook.author);
      setPrice(dataUpdateBook.price);
      setQuantity(dataUpdateBook.quantity);
      setCategory(dataUpdateBook.category);
      setThumbnail(dataUpdateBook.thumbnail);
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
  // console.log(">>>> check category", category);
  return (
    <>
      <Modal
        title="Update Book"
        open={isModalOpenUpdateBook}
        onOk={() => handleUpdateBook()}
        onCancel={handleCancel}
      >
        <div>
          <span>Tiêu đề</span>
          <Input
            value={mainText}
            onChange={(Event) => {
              setMainText(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Tác giả</span>
          <Input
            value={author}
            onChange={(Event) => {
              setAuthor(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Giá</span>
          <Input
            value={price}
            onChange={(Event) => {
              setPrice(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Số lượng</span>
          <Input
            value={quantity}
            onChange={(Event) => {
              setQuantity(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Thể loại</span>
          <Select
            style={{
              width: "100%",
              height: "30px",
              borderRadius: "5px",
              color: "#ccc",
            }}
            defaultValue={category}
            options={options}
            onChange={(Event) => {
              setCategory(Event);
            }}
          />
        </div>
        <div
          style={{
            marginTop: "10px",
            height: "100px",
            width: "150px",
          }}
        >
          {thumbnail && (
            <>
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/images/book/${thumbnail}`}
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
      </Modal>
    </>
  );
};
export default UpdateBook;
