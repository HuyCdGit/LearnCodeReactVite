import { Table, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUserModal from "./user.update.modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserViewDetail from "./user.view.detail";
import { deleteUserAPI } from "../services/service.api";
const UserTable = (props) => {
  const { dataUsers, loadUser } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(true);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isopenDrawer, setIsOpenDrawer] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  //PopConfirm
  const handleDelete = async (_id) => {
    const res = await deleteUserAPI(_id);
    if (res.data.data) {
      await loadUser();
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <Link
            onClick={() => {
              setIsOpenDrawer(true);
              setDataDetail(record);
            }}
          >
            {record._id}
          </Link>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "Flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setIsModalUpdateOpen(true);
              setDataUpdate(record);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => {
              handleDelete(record._id);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey="_id" />

      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <UserViewDetail
        isopenDrawer={isopenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
