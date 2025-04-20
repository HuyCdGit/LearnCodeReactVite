import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Menu, message } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  ProductOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserAPI } from "../services/service.api";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logoutUserAPI();
    if (res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.info(res.message);
      navigate("/");
    } else {
      message.error(res.data);
    }
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"books"}>Books</Link>,
      key: "books",
      icon: <ProductOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            { label: "Option 1", key: "setting:1" },
            { label: "Option 2", key: "setting:2" },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            { label: "Option 3", key: "setting:3" },
            { label: "Option 4", key: "setting:4" },
          ],
        },
      ],
    },
    ...(!user.id
      ? [
          {
            label: <Link to={"login"}>Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),

    ...(user.id
      ? [
          {
            label: <Link to={"/"}>Welcome {user.fullName}</Link>,
            key: "home",
            icon: <SettingOutlined />,
            children: [
              {
                label: <span onClick={() => handleLogout()}>Logout</span>,
                key: "logout",
              },
            ],
          },
        ]
      : []),
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
