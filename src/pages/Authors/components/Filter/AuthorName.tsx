import React from "react";
import { Form, Input } from "antd";

export function AuthorName() {
  return (
    <Form.Item
      label="Name"
      labelCol={{ xs: 24 }}
      labelAlign="left"
      name={["name"]}
    >
      <Input placeholder="Name" />
    </Form.Item>
  );
}
