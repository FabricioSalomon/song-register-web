import React from "react";
import { Form, Input } from "antd";

export function SongName() {
  return (
    <Form.Item
      label="Song"
      labelCol={{ xs: 24 }}
      labelAlign="left"
      name={["name"]}
    >
      <Input placeholder="Name" />
    </Form.Item>
  );
}
