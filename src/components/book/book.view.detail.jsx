import { Drawer, Button, App as AppAntd } from "antd";
import { useState } from "react";
import { handleUploadFile, updateBookAPI } from "../services/service.book";
const BookViewDetail = (props) => {
  const { isViewBook, setIsViewBook, dataViewBook, toVND } = props;
  const cancel = () => {
    setIsViewBook(false);
    // setDataViewBook(null);
  };
  //message
  const { notification } = AppAntd.useApp();

  //preview image
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

  const handleUploadBook = async () => {
    const resUpload = await handleUploadFile(selectedFile, "book");
    if (resUpload.data) {
      const bookAvatar = resUpload.data.fileUploaded;
      console.log(">>> check book file", bookAvatar);
      const resUpdateThumbnail = await updateBookAPI(
        dataViewBook._id,
        bookAvatar
      );
      if (resUpdateThumbnail.data) {
        notification.success({
          message: "Upload book",
          description: JSON.stringify(resUpload.message),
        });
      }
    } else {
      notification.error({
        message: "Upload book error",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  return (
    <>
      <Drawer
        width={"40vw"}
        title="Book Detail"
        onClose={cancel}
        // maskClosable={true}
        open={isViewBook}
      >
        {dataViewBook ? (
          <>
            <p>Id: {dataViewBook._id}</p>
            <br />
            <p>Tiêu đề: {dataViewBook.mainText}</p>
            <br />
            <p>Tác giả: {dataViewBook.author}</p>
            <br />
            <p>Thể loại: {dataViewBook.category}</p>
            <br />
            <p>Giá tiền: {toVND(dataViewBook.price || 0)}</p>
            <br />
            <p>Số lượng: {dataViewBook.quantity}</p>
            <br />
            <p>Đã bán: {dataViewBook.sold}</p>
            <div
              style={{
                marginTop: "10px",
                height: "100px",
                width: "150px",
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                  dataViewBook.thumbnail
                }`}
              />
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
                  <>
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                      src={preview}
                    />
                    <Button
                      type="primary"
                      onClick={() => {
                        handleUploadBook();
                      }}
                    >
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>không tìm thấy dữ liệu</p>
        )}
      </Drawer>
    </>
  );
};
export default BookViewDetail;
