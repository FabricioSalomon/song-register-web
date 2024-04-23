import React from "react";
import { Col, Row } from "antd";
import { Text } from "../Text";

interface SwtichChildrenProps {
  title: string;
  icon: React.ElementType;
}

export function SwtichChildren({
  title,
  icon: Icon,
}: Readonly<SwtichChildrenProps>) {
  return (
    <Row gutter={[8, 8]} align="middle">
      <Col><Text>{title}</Text></Col>
      <Col>
        <Icon />
      </Col>
    </Row>
  );
}
