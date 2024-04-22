import { Button, Col, Form, Input, Modal, Row } from "antd";
import React from "react";

import { Title } from "@/components/Title";
import { AuthorsResponse, useUpdateAuthor } from "@/hooks";

interface EditAuthorModalProps {
  author: AuthorsResponse;
  isModalOpen: boolean;
  onNewAuthorClick: (status: boolean) => void;
}

const { useForm } = Form;

export function EditAuthorModal({
  author,
  isModalOpen,
  onNewAuthorClick,
}: Readonly<EditAuthorModalProps>) {
  const [form] = useForm();
  const { mutateAsync: update } = useUpdateAuthor();

  async function handleCreateAuthor(): Promise<void> {
    try {
      const name = form.getFieldValue("author_name");
      const updated = await update({
        name,
        id: author.id,
      });
      if (updated?.id) {
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
                <Title level={3}>Edit author</Title>
              </Col>
              <Col>
                <Form.Item
                  label="Author"
                  labelAlign="left"
                  name="author_name"
                  labelCol={{ xs: 24 }}
                >
                  <Input placeholder={author.name} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Row justify="end">
                  <Button type="primary" onClick={() => handleCreateAuthor()}>
                    Save
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
