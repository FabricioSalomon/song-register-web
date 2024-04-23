import React from "react";
import moment from "moment";
import { Form, DatePicker } from "antd";

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
        placeholder="Start date"
        style={{ width: "100%" }}
        format={moment().format("L")}
        disabledDate={(current) => current > moment()}
      />
    </Form.Item>
  );
}
