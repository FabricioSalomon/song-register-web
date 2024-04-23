import { Button, Col, Form, Modal, Row } from "antd";
import dayjs from "dayjs";
import React from "react";

import {
  KeywordsResponse,
  ListAllSongsResponse,
  UpdateSongDTO,
  useDeleteSong,
  useUpdateSong,
} from "@/hooks";
import { Title } from "@/components/Title";
import { ReleasedAt } from "./ReleasedAt";
import { Keywords } from "./Keywords";
import { SongName } from "./SongName";
import { Authors } from "./Authors";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface EditSongModalProps {
  isModalOpen: boolean;
  song: ListAllSongsResponse;
  keywords: KeywordsResponse[];
  onModalClick(status: boolean): void;
}

const { useForm } = Form;

export function EditSongModal({
  song,
  keywords,
  isModalOpen,
  onModalClick,
}: Readonly<EditSongModalProps>) {
  const [form] = useForm();
  const { mutateAsync: udpate } = useUpdateSong();
  const { mutateAsync: deleteSong } = useDeleteSong();

  async function handleEditSong(): Promise<void> {
    try {
      const values: UpdateSongDTO = await form.validateFields();
      const updated = await udpate({
        id: song.id,
        name: values.name,
        author_id: values.author_id,
        keywords_ids: values.keywords_ids,
        released_at: dayjs(values.released_at).format(),
      });
      if (updated?.id) {
        form.resetFields();
        onModalClick(false);
      }
    } catch (error) {
      return;
    }
  }

  function handleDeleteSong(): void {
    Modal.confirm({
      okType: "danger",
      okText: "Confirm",
      title: "Heads up!",
      cancelText: "Cancel",
      icon: <ExclamationCircleOutlined />,
      content: "Want to delete this song?",
      onOk: async () => {
        try {
          const deleted = await deleteSong({
            id: song.id,
          });
          if (deleted?.id) {
            onModalClick(false);
          }
        } catch (error) {
          return error;
        }
      },
    });
  }

  const initialValues = {
    name: song.name,
    author_id: song.author_id,
    keywords_ids: keywords?.map(({ id }) => id),
    released_at: dayjs(new Date(song.released_at)),
  };

  return (
    <Modal
      footer={<></>}
      open={isModalOpen}
      onCancel={() => onModalClick(false)}
    >
      <Row>
        <Col xs={24}>
          <Form form={form} initialValues={initialValues}>
            <Row>
              <Col xs={24}>
                <Title level={3}>Edit song</Title>
              </Col>
              <Col xs={24}>
                <Row justify="center">
                  <Col xs={24}>
                    <Row justify="center" style={{ padding: "0 2rem" }}>
                      <Col xs={24}>
                        <SongName />
                      </Col>
                      <Col xs={24}>
                        <Authors />
                      </Col>
                      <Col xs={24}>
                        <Keywords />
                      </Col>
                      <Col xs={24}>
                        <ReleasedAt />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={24}>
                <Row justify="center" gutter={[16, 16]}>
                  <Col xs={12}>
                    <Button
                      type="default"
                      onClick={() => handleDeleteSong()}
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={() => handleEditSong()}>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
