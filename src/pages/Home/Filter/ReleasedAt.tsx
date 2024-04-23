import { DatePicker, Form } from "antd";
import React from "react";

interface ReleasedAtProps {}

export function ReleasedAt(props: Readonly<ReleasedAtProps>) {
  return (
    <Form.Item
      name={["released_at"]}
      labelCol={{ span: 24 }}
      label={"Date of release"}
    >
      <DatePicker.RangePicker
        placeholder={["Start date", "End date"]}
        style={{ width: "100%" }}
        format="YYYY-MM-DD"
      />
    </Form.Item>
  );
}
