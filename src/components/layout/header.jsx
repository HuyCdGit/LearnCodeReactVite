import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Menu } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  ProductOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [current, setCurrent] = useState("");
  console.log(">>>> check data", { user });
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
                label: "Logout",
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
