import { Button, Col, Form, Input, Modal, Row } from "antd";
import React from "react";

import { useCreateKeyword } from "@/hooks";
import { Title } from "@/components/Title";

interface CreateKeywordModalProps {
  isModalOpen: boolean;
  onNewKeywordClick: (status: boolean) => void;
}

const { useForm } = Form;

export function CreateKeywordModal({
  isModalOpen,
  onNewKeywordClick,
}: Readonly<CreateKeywordModalProps>) {
  const [form] = useForm();
  const { mutateAsync: create } = useCreateKeyword();

  async function handleCreateKeyword(): Promise<void> {
    const name = form.getFieldValue("keyword_name");
    const created = await create({
      name,
    });
    if (created?.id) {
      onNewKeywordClick(false);
    }
  }

  return (
    <Modal
      footer={<></>}
      open={isModalOpen}
      onCancel={() => onNewKeywordClick(false)}
    >
      <Row>
        <Col xs={24}>
          <Form form={form}>
            <Row>
              <Col xs={24}>
                <Title level={3}>Create keyword</Title>
              </Col>
              <Col>
                <Form.Item
                  label="Keyword"
                  labelAlign="left"
                  name="keyword_name"
                  labelCol={{ xs: 24 }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Row justify="end">
                  <Button type="primary" onClick={() => handleCreateKeyword()}>
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
