import {
  Button,
  Modal,
  Input,
  Select,
  InputNumber,
  App as AppAntd,
  Form,
} from "antd";
import { useState } from "react";
import { createBookAPI } from "../services/service.book";
const BookForm = (props) => {
  const { isModalOpen, setIsModalOpen, loadbook } = props;
  const { message, notification } = AppAntd.useApp();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Success:", selectedFile);
    if (selectedFile === "" || selectedFile === undefined) {
      notification.error({
        message: "Thubnail not find",
        description: "không được để trống thumbnail",
      });
      handleCancel();
    }
    console.log("check selectedFile.name:", selectedFile.name);
    const res = await createBookAPI(
      selectedFile.name,
      values.mainText,
      values.author,
      values.price,
      values.quantity,
      values.category
    );
    if (res.data) {
      message.success("Tạo book thành công");
      handleCancel();
    } else {
      notification.error({
        message: "Create book Error",
        description: "tạo book không thành công",
      });
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = async () => {
    setIsModalOpen(false);
    form.resetFields();
    await loadbook();
  };
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
  // const [thumbnail, setThumbnail] = useState("");
  // const [mainText, setMainText] = useState("");
  // const [author, setAuthor] = useState("");
  // const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [category, setCategory] = useState("");
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
  // const handleSubmit = async () => {
  //   console.log(
  //     ">>> check data create user",
  //     thumbnail,
  //     mainText,
  //     author,
  //     price,
  //     quantity,
  //     category
  //   );
  //   if (thumbnail === "") {
  //     console.log("không tìm thấy thumnail");
  //     notification.error({
  //       message: "Thubnail not find",
  //       description: "không được để trống thumbnail",
  //     });
  //   }
  //   const res = await createBookAPI(
  //     selectedFile.name,
  //     mainText,
  //     author,
  //     price,
  //     quantity,
  //     category
  //   );
  //   if (res.data) {
  //     message.success("Tạo book thành công");
  //     setIsModalOpen(false);
  //   } else {
  //     notification.error({
  //       message: "Create User Error",
  //       description: "tạo user không thành công",
  //     });
  //   }
  // };
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <UserViewDetail /> */}
          <h3>Table Books</h3>
          <Button onClick={() => showModal()} type="primary">
            Create Book
          </Button>
        </div>
      </div>
      {/* <Modal
        title="Create Book"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div>
          <div>
            <span>Tiêu đề</span>
            <Input
              value={mainText}
              onChange={(event) => setMainText(event.target.value)}
            />
          </div>
          <div>
            <span>Tác giả</span>
            <Input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          < div>
            <span>Giá tiền</span>
            <InputNumber
              style={{
                width: "100%",
              }}
              addonAfter={"VND"}
              value={price}
              onChange={(event) => {
                setPrice(event);
              }}
            />
          <div/>
          <div>
            <span>Số lượng</span>
            <InputNumber
              style={{
                width: "100%",
              }}
              value={quantity}
              onChange={(event) => {
                setQuantity(event);
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
              defaultValue={"Arts"}
              options={options}
              onChange={() => setCategory(options[0].value)}
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
        </div>
      </Modal> */}
      <Modal
        title="Create Book"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            label="Chủ đề"
            name="mainText"
            rules={[
              {
                required: true,
                message: "please input your mainText",
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
                message: "please input your author",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[
              {
                required: true,
                message: "please input your price",
              },
            ]}
          >
            <InputNumber addonAfter={"đ"} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "please input your quantity",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Thể loại"
            name="category"
            rules={[
              {
                required: true,
                message: "please input your category",
              },
            ]}
          >
            <Select style={{ width: "100%" }} options={options} />
          </Form.Item>
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
        </Form>
      </Modal>
    </div>
  );
};
export default BookForm;
