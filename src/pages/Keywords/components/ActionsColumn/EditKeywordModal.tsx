import { Button, Col, Form, Input, Modal, Row } from "antd";
import React from "react";

import { Title } from "@/components/Title";
import { KeywordsResponse, useUpdateKeyword } from "@/hooks";

interface EditKeywordModalProps {
  keyword: KeywordsResponse;
  isModalOpen: boolean;
  onNewKeywordClick: (status: boolean) => void;
}

const { useForm } = Form;

export function EditKeywordModal({
  keyword,
  isModalOpen,
  onNewKeywordClick,
}: Readonly<EditKeywordModalProps>) {
  const [form] = useForm();
  const { mutateAsync: update } = useUpdateKeyword();

  async function handleCreateKeyword(): Promise<void> {
    try {
      const name = form.getFieldValue("keyword_name");
      const updated = await update({
        name,
        id: keyword.id,
      });
      if (updated?.id) {
        onNewKeywordClick(false);
      }
    } catch (error) {
      return;
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
                <Title level={3}>Edit keyword</Title>
              </Col>
              <Col>
                <Form.Item
                  label="Keyword"
                  labelAlign="left"
                  name="keyword_name"
                  labelCol={{ xs: 24 }}
                >
                  <Input placeholder={keyword.name} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Row justify="end">
                  <Button type="primary" onClick={() => handleCreateKeyword()}>
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
