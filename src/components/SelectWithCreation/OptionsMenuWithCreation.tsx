import React, { useState } from "react";
import { Button, Col, Row } from "antd";

import { CustomDivider, CustomInput } from "./styles";

interface OptionsMenuWithCreationProps {
  creatingData?: boolean;
  optionsMenu: React.ReactNode;
  onCreate: (name: string) => void;
}

export function OptionsMenuWithCreation({
  onCreate,
  optionsMenu,
  creatingData = false,
}: Readonly<OptionsMenuWithCreationProps>) {
  const [currentName, setCurrentName] = useState<string>("");

  function handleChangeName(name: string) {
    setCurrentName(name);
  }

  function handleCreate(name: string) {
    setCurrentName("");
    onCreate(name);
  }

  return (
    <Row gutter={[4, 4]}>
      <Col xs={24}>{optionsMenu}</Col>
      <CustomDivider />
      <Col xs={24}>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <CustomInput
              value={currentName}
              onChange={(event) => handleChangeName(event.target.value)}
            />
          </Col>
          <Col xs={24}>
            <Button
              type="link"
              loading={creatingData}
              onClick={() => handleCreate(currentName)}
              disabled={!currentName || currentName.length < 3}
            >
              Add item
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
