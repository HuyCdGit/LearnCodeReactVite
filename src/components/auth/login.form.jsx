import { Button, Input, notification } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleClickBtn = async () => {
    const data = {
      username: userName,
      password: password,
    };
    const URL_BACKEND = "http://localhost:8080/api/v1/auth/login";
    const res = await axios.post(URL_BACKEND, data);
    console.log(">>> check token: ", JSON.stringify(res.data));
    if (!res.error) {
      localStorage.setItem("access_token", res.data.access_token);
      notification.success({
        message: "Successed",
        description: `đăng nhập thành công`,
      });
      navigate("/");
    } else {
      alert.error({ message: "Failed", description: `${res.message}` });
    }
    console.log(">>> check login: ", { userName, password });
  };
  return (
    <div className="login-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>UserName</span>
          <Input
            value={userName}
            onChange={(Event) => setUserName(Event.target.value)}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(Event) => setPassword(Event.target.value)}
          />
        </div>
        <Button onClick={handleClickBtn} type="primary">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
