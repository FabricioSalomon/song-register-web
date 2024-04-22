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
import { Col, Menu, Row, Switch } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { Text } from "../Text";
import { Theme } from "@/theme";
import { SwtichChildren } from "./SwtichChildren";
import { MenuContainer, SwitchContainer } from "./styles";
import { useThemeContext } from "@/context/Theme";

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
        padding: "0.5rem 0",
        marginBottom: "2rem",
        borderBottom: `1px solid ${fontColor}`,
      }}
    >
      <Col xs={24}>
        <Row align="middle">
          <MenuContainer xs={20}>
            <Menu
              items={items}
              mode="horizontal"
              selectedKeys={[current]}
              onClick={(event) => handleMenuClick(event.key)}
            />
          </MenuContainer>
          <Col xs={4}>
            <Row justify="end" align="middle" gutter={[4, 4]}>
              <Col>
                <Text>Theme</Text>
              </Col>
              <SwitchContainer xs={8}>
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
      </Col>
    </Row>
  );
}
