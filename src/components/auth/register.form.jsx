import { Button, Form, Input, notification, Col, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { resgisterUserAPI } from "../services/service.api";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const nagivate = useNavigate();
  const [form] = useForm();
  const onFinish = async (values) => {
    console.log(">>> check Values: ", values);
    const res = await resgisterUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    console.log(">>> check register data: ", res);
    if (res.data) {
      notification.success({
        message: "Register user",
        description: JSON.stringify(res.message),
      });
      nagivate("/users");
    } else {
      notification.success({
        message: "Register user error",
        description: "Đăng ký không thành công user",
      });
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ margin: "10px" }}
      // onFinishFailed={onFinishFailed}
    >
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                pattern: new RegExp(/\d+/g),
                message: "Wrong format!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <div>
            <Button type="primary" onClick={() => form.submit()}>
              Register
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
export default RegisterUser;
