import { Table } from "antd";
import { fetchAllUserAPI } from "../services/service.api";
import { useEffect, useState } from "react";
const UserTable = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  useEffect(() => {
    console.log(">>> Run 111");
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetchAllUserAPI();
    setDataUsers(res.data.data);
  };
  console.log(">>> Run 000");
  return <Table columns={columns} dataSource={dataUsers} rowKey="_id" />;
};

export default UserTable;
