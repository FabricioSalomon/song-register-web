import React from "react";
import { Form, Input } from "antd";

export function KeywordName() {
  return (
    <Form.Item
      label="Name"
      name={["name"]}
      labelAlign="left"
      labelCol={{ xs: 24 }}
    >
      <Input placeholder="Name" />
    </Form.Item>
  );
}
