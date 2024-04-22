import React from "react";
import { Col, Row } from "antd";

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
      <Col>{title}</Col>
      <Col>
        <Icon />
      </Col>
    </Row>
  );
}
