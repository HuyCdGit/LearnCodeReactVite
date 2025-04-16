import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from "../components/services/service.api";
import { useState, useEffect } from "react";
const UserPage = () => {
  //lift up state
  const [dataUsers, setDataUsers] = useState([]);
  //get user with paginate
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  // next data = pre data
  useEffect(() => {
    // loadUser();
    (async () => {
      await loadUser();
    })();
  }, [current, pageSize]);
  const loadUser = async () => {
    const res = await fetchAllUserAPI(current, pageSize);
    if (res.data) {
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setTotal(res.data.meta.total);
      setPageSize(res.data.meta.pageSize);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser} />
      <UserTable
        dataUsers={dataUsers}
        loadUser={loadUser}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default UserPage;
