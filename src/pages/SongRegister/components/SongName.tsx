import React from "react";
import { Form, Input } from "antd";

export function SongName() {
  return (
    <Form.Item
      label="Song name"
      labelCol={{ xs: 24 }}
      labelAlign="left"
      name={["name"]}
      rules={[
        {
          required: true,
          message: "Enter a song name",
        },
      ]}
    >
      <Input placeholder="Name" />
    </Form.Item>
  );
}
