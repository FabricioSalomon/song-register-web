import React from "react";
import { Form, Input } from "antd";

export function KeywordName() {
  return (
    <Form.Item
      label="Keyword"
      labelCol={{ xs: 24 }}
      labelAlign="left"
      name={["keyword"]}
    >
      <Input placeholder="Name" />
    </Form.Item>
  );
}
