import { Drawer } from "antd";
import { useState } from "react";
const UserViewDetail = (props) => {
  const { isopenDrawer, setIsOpenDrawer, dataDetail, setDataDetail } = props;

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
  console.log(">>> check file", preview);
  return (
    <Drawer
      width={"40vw"}
      title="Close Detail"
      onClose={() => {
        setIsOpenDrawer(false);
        setDataDetail(null);
      }}
      open={isopenDrawer}
    >
      {dataDetail ? (
        <>
          <p>Id: {dataDetail._id}</p>
          <br />
          <p>Full Name: {dataDetail.fullName}</p>
          <br />
          <p>Phone: {dataDetail.phone}</p>
          <br />
          <p>Avatar:</p>
          <div
            style={{
              marginTop: "10px",
              height: "100px",
              width: "150px",
              border: "1px solid #ccc",
            }}
          >
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                dataDetail.avatar
              }`}
            />
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
              border: "1px solid #ccc",
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
        </>
      ) : (
        <>
          <p>Không tìm thấy dữ liệu</p>
        </>
      )}
    </Drawer>
  );
};
export default UserViewDetail;
