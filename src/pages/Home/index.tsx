import { Col, Row, Skeleton } from "antd";
import React from "react";

import { useGetAuthors } from "@/hooks";
import { Text } from "@/components/Text";
import { Title } from "@/components/Title";

export function Home() {
  const {
    error,
    isFetching,
    data: authors,
    isError: errorGettingAuthors,
  } = useGetAuthors({
    name: "",
  });

  if (errorGettingAuthors) {
    return (
      <Row>
        <Text>{error.message ?? "Error getting authors"}</Text>
      </Row>
    );
  }

  if (isFetching) {
    return (
      <Row>
        <Skeleton active />
      </Row>
    );
  }

  return (
    <Row style={{ padding: "0 1rem" }} gutter={[16, 16]}>
      <Col xs={24}>
        <Title level={3} style={{ margin: 0 }}>
          Home
        </Title>
      </Col>
    </Row>
  );
}
