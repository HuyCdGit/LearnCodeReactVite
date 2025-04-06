import { Input, Button } from "antd";
import { useState } from "react";
const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClickBtn = () => {
    console.log(" >>>> check state: ", {
      fullName,
      email,
      password,
      phoneNumber,
    });
  };
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
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
          <span>Email</span>
          <Input
            value={email}
            onChange={(Event) => {
              setEmail(Event.target.value);
            }}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(Event) => {
              setPassword(Event.target.value);
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
        <Button onClick={() => handleClickBtn()} type="primary">
          Create User
        </Button>
      </div>
    </div>
  );
};
export default UserForm;
