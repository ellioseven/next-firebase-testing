import { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Space,
  Typography,
} from "antd";
import Link from "next/link";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const rules = [{ required: true, message: "Required" }];

export const FormUserScore = () => {
  const form = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);
    fetch("http://localhost:3000/api/score/create", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        score: values.score,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(() => {
        message.success("Score Submitted");
        form[0].resetFields();
      })
      .catch((error) => message.error(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Enter Your Score
      </Typography.Title>
      <p>
        <Link href="/top-scores">
          <a>View Top Scores</a>
        </Link>
      </p>
      <Divider />
      <Form onFinish={handleFinish} {...layout} form={form[0]}>
        <Form.Item label="Name" rules={rules} name="name">
          <Input disabled={isLoading} />
        </Form.Item>
        <Form.Item label="Score" rules={rules} name="score">
          <InputNumber disabled={isLoading} max={100} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit Your Score
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
