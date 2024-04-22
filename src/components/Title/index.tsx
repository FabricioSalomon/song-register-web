import React from "react";
import type { TitleProps as DefaultTitleProps } from "antd/lib/typography/Title";

import { CustomTitle } from "./styles";

interface TitleProps extends DefaultTitleProps {
  children: React.ReactNode;
}

export function Title({ children, ...rest }: Readonly<TitleProps>) {
  return <CustomTitle {...rest}>{children}</CustomTitle>;
}
