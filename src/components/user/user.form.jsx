import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../services/service.api";
const UserForm = (props) => {
  const { loadUser } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // User modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    const res = await createUserAPI(fullName, email, password, phoneNumber);
    if (res.data.data) {
      notification.success({
        message: "Create user",
        description: "Tạo thành công user",
      });
      await loadUser();
      resetAndCloseModal();
    }
    console.log(" >>>> check state: ", res.data.data);
  };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Table Users</h3>
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Create User
          </Button>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => handleSubmit()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText={"CREATE"}
      >
        <div>
          <span>Full name </span>
          <Input
            value={fullName}
            onChange={(Event) => {
              setFullName(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Email</span>
          <Input
            value={email}
            onChange={(Event) => {
              setEmail(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(Event) => {
              setPassword(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Phone number</span>
          <Input
            value={phoneNumber}
            onChange={(Event) => {
              setPhoneNumber(Event.target.value);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
export default UserForm;
