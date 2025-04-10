import { useEffect, useState } from "react";
import { Input, Modal, notification } from "antd";
import { updateUserAPI } from "../services/service.api";

const UpdateUserModal = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;

  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    console.log(">>> check dataUpdate props", dataUpdate);
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhoneNumber(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSubmit = async () => {
    const res = await updateUserAPI(id, fullName, phoneNumber);
    if (res.data.data) {
      notification.success({
        message: "Update user",
        description: "Cập nhật thành công user",
      });
      resetAndCloseModal();
      await loadUser();
    }
    console.log(" >>>> check state: ", res.data.data);
  };

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhoneNumber("");
    setDataUpdate(null);
  };
  return (
    <Modal
      title="Update User"
      open={isModalUpdateOpen}
      onOk={() => handleSubmit()}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"SAVE"}
    >
      <div>
        <span>Id</span>
        <Input value={id} disabled />
      </div>
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
        <span>Phone number</span>
        <Input
          value={phoneNumber}
          onChange={(Event) => {
            setPhoneNumber(Event.target.value);
          }}
        />
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
