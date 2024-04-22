import React from "react";
import { Typography } from "antd";
import type { TextProps as DefaultTextProps } from "antd/lib/typography/Text";

interface TextProps extends DefaultTextProps {
  children: React.ReactNode;
}

export function Text({ children, ...rest }: Readonly<TextProps>) {
  return <Typography.Text {...rest}>{children}</Typography.Text>;
}
