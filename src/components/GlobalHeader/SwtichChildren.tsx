import React from "react";
import { Col, Row } from "antd";

import { Text } from "../Text";
import { TextProps } from "antd/lib/typography/Text";

interface SwtichChildrenProps {
  title: string;
  textProps?: TextProps;
  icon: React.ElementType;
}

export function SwtichChildren({
  title,
  textProps,
  icon: Icon,
}: Readonly<SwtichChildrenProps>) {
  return (
    <Row gutter={[8, 8]} align="middle">
      <Col>
        <Text {...textProps}>{title}</Text>
      </Col>
      <Col>
        <Icon />
      </Col>
    </Row>
  );
}
