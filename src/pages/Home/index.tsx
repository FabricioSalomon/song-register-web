import { Col, Row, Skeleton } from "antd";
import React from "react";

import { Title } from "@/components/Title";
import { useListAllSongs } from "@/hooks";
import { Text } from "@/components/Text";
import { SongCard } from "./SongCard";
import { NoSongsRegistered } from "./NoSongsRegistered";

export function Home() {
  const {
    error,
    isFetching,
    data: songs,
    isError: errorGettingSongs,
  } = useListAllSongs({});

  if (errorGettingSongs) {
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
        {songs && songs.length > 0 ? (
          songs.map((song) => <SongCard key={song.id} song={song} />)
        ) : (
          <NoSongsRegistered />
        )}
      </Col>
    </Row>
  );
}
