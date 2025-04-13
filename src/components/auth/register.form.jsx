import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
const RegisterUser = () => {
  const [form] = useForm();
  const onFinish = (values) => {
    console.log(">>> check Values: ", values);
  };
  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <div
        style={{
          margin: "50px",
          //   display: "Flex",
          //   flexDirection: "column",
        }}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" onClick={() => form.submit()}>
            Register
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
export default RegisterUser;
