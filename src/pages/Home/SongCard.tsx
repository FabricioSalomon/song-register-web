import { Card, Col, Row } from "antd";
import React from "react";

import { Song } from "@/types";
import { useGetKeywordsBySong } from "@/hooks";

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: Readonly<SongCardProps>) {
  const { data: keywords } = useGetKeywordsBySong({
    song_id: song.id,
  });
  return (
    <Col xs={6}>
      <Card>
        <Row>{song.name}</Row>
        {keywords &&
          keywords?.length > 0 &&
          keywords.map(({ id, name }) => <Row key={id}>{name}</Row>)}
      </Card>
    </Col>
  );
}
