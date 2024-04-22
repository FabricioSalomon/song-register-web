import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Modal, Row } from "antd";

import { Inline } from "./Inline";
import { HamburgerMenu } from "./HamburgerMenu";
import { ActionsColumnContainer } from "./styles";
import { EditKeywordModal } from "./EditKeywordModal";
import { KeywordsResponse, useDeleteKeyword } from "@/hooks";

interface ActionsColumnProps {
  keyword: KeywordsResponse;
}

export function ActionsColumn({ keyword }: Readonly<ActionsColumnProps>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutateAsync: deleteKeyword } = useDeleteKeyword();

  function handleDeleteClick() {
    Modal.confirm({
      okType: "danger",
      okText: "Confirm",
      title: "Heads up!",
      cancelText: "Cancel",
      icon: <ExclamationCircleOutlined />,
      content: "Want to delete this keyword? All songs will be deleted with it.",
      onOk: async () => {
        try {
          const deleted = await deleteKeyword({
            id: keyword.id,
          });
          if (deleted?.id) {
            handleEditClick(false);
          }
        } catch (error) {
          return error;
        }
      },
    });
  }

  function handleEditClick(status: boolean) {
    setIsModalOpen(status);
  }

  return (
    <ActionsColumnContainer xs={24}>
      <Row className="inline">
        <Inline
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </Row>
      <Row className="hamburger-menu">
        <HamburgerMenu
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </Row>
      {isModalOpen && (
        <EditKeywordModal
          keyword={keyword}
          isModalOpen={isModalOpen}
          onNewKeywordClick={handleEditClick}
        />
      )}
    </ActionsColumnContainer>
  );
}
