import React from "react";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined, MenuOutlined } from "@ant-design/icons";

import { OptionDropdown } from "./OptionDropdown";
import { DeleteButtonContainer, Hamburger } from "./styles";

interface HamburgerMenuProps {
  onEditClick: (status: boolean) => void;
  onDeleteClick: () => void;
}

export function HamburgerMenu({
  onDeleteClick,
  onEditClick,
}: Readonly<HamburgerMenuProps>) {
  const items = [
    {
      key: 1,
      icon: <EditOutlined />,
      label: (
        <OptionDropdown onClick={() => onEditClick(true)}>Edit</OptionDropdown>
      ),
    },
    {
      key: 4,
      danger: true,
      icon: <DeleteOutlined />,
      label: (
        <DeleteButtonContainer>
          <OptionDropdown onClick={() => onDeleteClick()}>
            Delete
          </OptionDropdown>
        </DeleteButtonContainer>
      ),
    },
  ];

  return (
    <Hamburger menu={{ items }} placement="bottom" trigger={["click"]}>
      <Button type="link">
        <MenuOutlined />
      </Button>
    </Hamburger>
  );
}
