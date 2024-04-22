import React from "react";
import { Form, Input } from "antd";

export function AuthorName() {
  return (
    <Form.Item name={["name"]}>
      <Input placeholder="Name" />
    </Form.Item>
  );
}
