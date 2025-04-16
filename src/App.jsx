import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./components/services/service.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    }
  };
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
