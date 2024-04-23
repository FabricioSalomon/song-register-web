import { Button, Col, Form, Input, Modal, Row } from "antd";
import React from "react";

import { useCreateAuthor } from "@/hooks";
import { Title } from "@/components/Title";

interface CreateAuthorModalProps {
  isModalOpen: boolean;
  onNewAuthorClick: (status: boolean) => void;
}

const { useForm } = Form;

export function CreateAuthorModal({
  isModalOpen,
  onNewAuthorClick,
}: Readonly<CreateAuthorModalProps>) {
  const [form] = useForm();
  const { mutateAsync: create } = useCreateAuthor();

  async function handleCreateAuthor(): Promise<void> {
    try {
      const name = form.getFieldValue("author_name");
      const created = await create({
        name,
      });
      if (created?.id) {
        onNewAuthorClick(false);
      }
    } catch (error) {
      return;
    }
  }

  return (
    <Modal
      footer={<></>}
      open={isModalOpen}
      onCancel={() => onNewAuthorClick(false)}
    >
      <Row>
        <Col xs={24}>
          <Form form={form}>
            <Row>
              <Col xs={24}>
                <Title level={3}>Create author</Title>
              </Col>
              <Col>
                <Form.Item
                  label="Author"
                  labelAlign="left"
                  name="author_name"
                  labelCol={{ xs: 24 }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Row justify="end">
                  <Button type="primary" onClick={() => handleCreateAuthor()}>
                    Create
                  </Button>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
