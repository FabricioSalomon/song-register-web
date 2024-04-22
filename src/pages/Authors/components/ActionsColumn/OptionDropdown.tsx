import React from "react";
import { ButtonProps } from "antd";

import { HamburgerButton } from "./styles";

interface OptionDropdownProps extends ButtonProps {
  children: React.ReactNode;
}

export function OptionDropdown({
  children,
  ...props
}: Readonly<OptionDropdownProps>) {
  return (
    <HamburgerButton type="link" {...props}>
      <span>{children}</span>
    </HamburgerButton>
  );
}
