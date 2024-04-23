import { Button, Col, Row, Tooltip } from "antd";
import { TagOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import moment from "moment";

import { Text } from "@/components/Text";
import { Title } from "@/components/Title";
import { EditSongModal } from "./EditSongModal";
import { CustomCard, KeyworkContainer } from "../styles";
import { ListAllSongsResponse, useGetKeywordsBySong } from "@/hooks";

interface SongCardProps {
  song: ListAllSongsResponse;
}

export function SongCard({ song }: Readonly<SongCardProps>) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const { data: keywords } = useGetKeywordsBySong({
    song_id: song.id,
  });

  function handleCardModalClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault();
    event.stopPropagation();
    handleModalClick(true);
  }

  function handleModalClick(status: boolean): void {
    setIsEditModalOpen(status);
  }

  return (
    <Col xs={12} lg={6} xl={5} xxl={4}>
      <CustomCard onClick={handleCardModalClick}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Title style={{ margin: 0 }} level={2}>
              {song.name}
            </Title>
            <Title style={{ margin: 0 }} level={5}>
              {song.author}
            </Title>
            <Row justify="start">
              <Text>{moment(song.released_at).format("L")}</Text>
            </Row>
          </Col>
          {keywords && keywords?.length > 0 && (
            <Col xs={24}>
              <Row justify="start" gutter={[8, 8]}>
                {keywords.map(({ id, name }) => (
                  <KeyworkContainer key={id}>
                    <Tooltip title={name}>
                      <Button
                        size="small"
                        type="primary"
                        icon={<TagOutlined />}
                      >
                        {name}
                      </Button>
                    </Tooltip>
                  </KeyworkContainer>
                ))}
              </Row>
            </Col>
          )}
        </Row>
      </CustomCard>
      {isEditModalOpen && (
        <EditSongModal
          song={song}
          keywords={keywords}
          isModalOpen={isEditModalOpen}
          onModalClick={handleModalClick}
        />
      )}
    </Col>
  );
}
