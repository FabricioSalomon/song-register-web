import React from "react";
import { Col, Row } from "antd";

import { Text } from "@/components/Text";

interface NoSongsFoundProps {}

export function NoSongsFound(props: Readonly<NoSongsFoundProps>) {
  return (
    <Row>
      <Col xs={24}>
        <Text>No songs were found for the applied filter.</Text>
      </Col>
    </Row>
  );
}
