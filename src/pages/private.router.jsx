import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
// import { Navigate } from "react-router-dom";
import { Result, Button } from "antd";
const PrivateRouter = (props) => {
  const { user } = useContext(AuthContext);
  if (user && user.id) {
    console.log(">> check userid: ", user.id);
    return <>{props.children}</>;
  }
  //   <Navigate to="/login" replace />;
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};
export default PrivateRouter;
