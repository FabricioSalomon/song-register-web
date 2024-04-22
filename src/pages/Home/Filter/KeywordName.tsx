import React from "react";
import { Form, Input } from "antd";

export function KeywordName() {
  return (
    <Form.Item
      label="name"
      labelCol={{ xs: 24 }}
      labelAlign="left"
      name={["name"]}
    >
      <Input placeholder="Name" />
    </Form.Item>
  );
}
