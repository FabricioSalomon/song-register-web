import { Form, DatePicker } from "antd";
import React from "react";
import dayjs from "dayjs";

export function ReleasedAt() {
  return (
    <Form.Item
      label="Released at"
      labelCol={{ xs: 24 }}
      labelAlign="left"
      name={["released_at"]}
      rules={[
        {
          required: true,
          message: "Select a date",
        },
      ]}
    >
      <DatePicker
        style={{ width: "100%" }}
        disabledDate={(current) => current > dayjs()}
      />
    </Form.Item>
  );
}
