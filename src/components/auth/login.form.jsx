import { Button, Form, Input, Col, Row, Divider, App as AppAntd } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router";
import { loginUserAPI } from "../services/service.api";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const { message } = AppAntd.useApp();
  const [isLoading, setIsloading] = useState(false);
  const onFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    setIsloading(true);
    const res = await loginUserAPI(values.userName, values.password);
    console.log(">>> check message Error: ", res);
    if (res.data.data) {
      message.success("Đăng nhập thành công!");
      navigate("/");
    }
    if (res.message) {
      message.error(`${res.message}`);
    }
    setIsloading(false);
  };

  return (
    <Row
      justify={"center"}
      style={{
        marginTop: "30px",
      }}
    >
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>
            <strong>Đăng nhập</strong>
          </legend>
          <Form
            form={form}
            onFinish={onFinish}
            onFailed={onFailed}
            layout="vertical"
          >
            <Form.Item
              label="User Name"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <Button
                loading={isLoading}
                type="primary"
                onClick={() => form.submit()}
              >
                Login
              </Button>
              <Link to={"/"}>
                Go to homepage <ArrowRightOutlined />
              </Link>
            </div>
            <br />
            <Divider />
            <Row justify={"center"}>
              <p>
                Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
              </p>
            </Row>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginForm;
