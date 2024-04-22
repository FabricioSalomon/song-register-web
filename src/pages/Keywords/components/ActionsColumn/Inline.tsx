import React from "react";
import { Button, Col, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { ActionsButtonsContainer } from "./styles";

interface InlineProps {
  onEditClick: (status: boolean) => void;
  onDeleteClick: () => void;
}

export function Inline({ onDeleteClick, onEditClick }: Readonly<InlineProps>) {
  return (
    <ActionsButtonsContainer align="middle" justify="space-evenly">
      <Col lg={5}>
        <Tooltip title="Edit">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEditClick(true)}
          />
        </Tooltip>
      </Col>
      <Col lg={5}>
        <Tooltip title="Delete">
          <Button
            danger
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteClick()}
          />
        </Tooltip>
      </Col>
    </ActionsButtonsContainer>
  );
}
