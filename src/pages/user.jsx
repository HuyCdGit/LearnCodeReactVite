import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from "../components/services/service.api";
import { useState, useEffect } from "react";
const UserPage = () => {
  //lift up state
  const [dataUsers, setDataUsers] = useState([]);
  // next data = pre data
  useEffect(() => {
    // loadUser();
    (async () => {
      await loadUser();
    })();
  }, []);
  const loadUser = async () => {
    const res = await fetchAllUserAPI();
    setDataUsers(res.data.data);
  };
  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser} />
      <UserTable dataUsers={dataUsers} loadUser={loadUser} />
    </div>
  );
};

export default UserPage;
