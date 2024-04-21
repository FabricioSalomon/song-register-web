import { Col, Row, Skeleton } from "antd";
import React from "react";

import { useGetAuthors } from "@/hooks";
import { Text } from "@/components/Text";

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
    <Row>
      <Col xs={24}>Home</Col>
    </Row>
  );
}
