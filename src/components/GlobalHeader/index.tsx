import React from "react";
import { Col, Row, Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import { Theme } from "@/theme";
import { SwitchContainer } from "./styles";
import { Text } from "../Text";
import { SwtichChildren } from "./SwtichChildren";

interface GlobalHeaderProps {
  onSelectTheme: (theme: Theme) => void;
}

export function GlobalHeader({ onSelectTheme }: Readonly<GlobalHeaderProps>) {
  const storageTheme = localStorage.getItem("theme");

  function handleSelectTheme(value: boolean) {
    return onSelectTheme(!value ? Theme.LIGHT : Theme.DARK);
  }

  return (
    <Row>
      <Col xs={24}>
        <Row justify="end" align="middle">
          <Col xs={1}>
            <Text>Theme</Text>
          </Col>
          <SwitchContainer xs={2}>
            <Switch
              checked={(storageTheme as Theme) === Theme.DARK}
              onChange={handleSelectTheme}
              checkedChildren={
                <SwtichChildren title="Dark" icon={MoonOutlined} />
              }
              unCheckedChildren={
                <SwtichChildren title="Light" icon={SunOutlined} />
              }
            />
          </SwitchContainer>
        </Row>
      </Col>
    </Row>
  );
}
