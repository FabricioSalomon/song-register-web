import React from "react";
import { Button, Col, Form, Row } from "antd";

import { Authors, Keywords, ReleasedAt, SongName } from "./components";
import { CreateSongDTO, useCreateSong } from "@/hooks";
import moment from "moment";

interface SongRegisterProps {}

const { useForm } = Form;

export function SongRegister(props: Readonly<SongRegisterProps>) {
  const [form] = useForm();

  const { mutateAsync: create } = useCreateSong();

  async function handleRegister() {
    try {
      const values: CreateSongDTO = await form.validateFields();
      console.log({ keywords_ids: values.keywords_ids });
      const created = await create({
        name: values.name,
        author_id: values.author_id,
        keywords_ids: values.keywords_ids,
        released_at: moment(values.released_at),
      });
      console.log({ created });
    } catch (error) {
      return;
    }
  }

  return (
    <Row justify="center">
      <Col xs={16}>
        <Form form={form}>
          <Row justify="center" style={{ padding: "0 2rem" }} gutter={[16, 16]}>
            <Col xs={12}>
              <SongName />
            </Col>
            <Col xs={12}>
              <Authors />
            </Col>
            <Col xs={12}>
              <Keywords />
            </Col>
            <Col xs={12}>
              <ReleasedAt />
            </Col>
            <Col>
              <Button size="large" type="primary" onClick={handleRegister}>
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
