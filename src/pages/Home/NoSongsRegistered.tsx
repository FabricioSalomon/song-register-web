import React from "react";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

import { Text } from "@/components/Text";

interface NoSongsRegisteredProps {}

export function NoSongsRegistered(props: Readonly<NoSongsRegisteredProps>) {
  const navigate = useNavigate();

  function handleRegisterSongClick(): void {
    return navigate("/song-register");
  }

  return (
    <Row>
      <Col xs={24}>
        <Text>No songs available, please register new songs to list them.</Text>
      </Col>
      <Col xs={24}>
        <Button type="primary" onClick={handleRegisterSongClick}>
          Register new song now!
        </Button>
      </Col>
    </Row>
  );
}
