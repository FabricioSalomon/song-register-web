import React from "react";
import { Button, Card, Col, Form, Row } from "antd";

import { Authors, Keywords, ReleasedAt, SongName } from "./components";
import { CreateSongDTO, useCreateSong } from "@/hooks";
import { Title } from "@/components/Title";
import dayjs from "dayjs";

interface SongRegisterProps {}

const { useForm } = Form;

export function SongRegister(props: Readonly<SongRegisterProps>) {
  const [form] = useForm();

  const { mutateAsync: create } = useCreateSong();

  async function handleRegister() {
    try {
      const values: CreateSongDTO = await form.validateFields();
      const created = await create({
        name: values.name,
        author_id: values.author_id,
        keywords_ids: values.keywords_ids,
        released_at: dayjs(values.released_at).format(),
      });
      if (created?.id) {
        form.resetFields();
      }
    } catch (error) {
      return;
    }
  }

  return (
    <Row style={{ padding: "0 1rem" }} gutter={[16, 16]}>
      <Title level={3} style={{ margin: 0 }}>
        Register
      </Title>
      <Col xs={24}>
        <Row justify="center">
          <Col xs={16} xl={12}>
            <Card>
              <Form form={form}>
                <Row
                  justify="center"
                  style={{ padding: "0 2rem" }}
                  gutter={[16, 16]}
                >
                  <Col xs={24} lg={12}>
                    <SongName />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Authors />
                  </Col>
                  <Col xs={24} lg={12}>
                    <Keywords />
                  </Col>
                  <Col xs={24} lg={12}>
                    <ReleasedAt />
                  </Col>
                  <Col>
                    <Button
                      size="large"
                      type="primary"
                      onClick={handleRegister}
                    >
                      Register
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
