import {
  SunOutlined,
  KeyOutlined,
  MoonOutlined,
  SaveOutlined,
  PlayCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd/lib";
import React, { useEffect, useState } from "react";
import { Col, Form, Menu, Row, Switch } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { Theme } from "@/theme";
import { SwtichChildren } from "./SwtichChildren";
import { useThemeContext } from "@/context/Theme";
import { MenuContainer, SwitchContainer } from "./styles";

interface GlobalHeaderProps {
  onSelectTheme: (theme: Theme) => void;
}

const items: MenuProps["items"] = [
  {
    key: "/",
    label: "Songs",
    icon: <PlayCircleOutlined />,
  },
  {
    key: "/song-register",
    label: "Song register",
    icon: <SaveOutlined />,
  },
  {
    key: "/authors",
    label: "Authors",
    icon: <UsergroupAddOutlined />,
  },
  {
    key: "/keywords",
    label: "Keywords",
    icon: <KeyOutlined />,
  },
];

export function GlobalHeader({ onSelectTheme }: Readonly<GlobalHeaderProps>) {
  const navigate = useNavigate();
  const location = useLocation();
  const { fontColor } = useThemeContext();

  const [current, setCurrent] = useState<string>(location.pathname ?? "/");

  const storageTheme = localStorage.getItem("theme");

  useEffect(() => {
    if (current !== location.pathname) {
      setCurrent(location.pathname);
    }
  }, [location]);

  function handleSelectTheme(value: boolean) {
    return onSelectTheme(!value ? Theme.LIGHT : Theme.DARK);
  }

  function handleMenuClick(menuOption: string) {
    navigate(menuOption);
    setCurrent(menuOption);
  }

  return (
    <Row
      style={{
        padding: "0.5rem",
        marginBottom: "2rem",
        borderBottom: `1px solid ${fontColor}`,
      }}
    >
      <Col xs={24}>
        <Row align="middle" justify="space-between">
          <MenuContainer xs={16}>
            <Menu
              items={items}
              mode="horizontal"
              selectedKeys={[current]}
              onClick={(event) => handleMenuClick(event.key)}
            />
          </MenuContainer>
          <Col>
            <Row justify="end" align="middle" gutter={[4, 4]}>
              <Form.Item style={{ margin: 0 }} label="Theme">
                <SwitchContainer xs={24}>
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
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
