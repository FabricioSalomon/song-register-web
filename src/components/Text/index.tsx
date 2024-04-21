import React from "react";
import type { TextProps as DefaultTextProps } from "antd/lib/typography/Text";
import { PersonalisedText } from "./styles";

interface TextProps extends DefaultTextProps {
  children: React.ReactNode;
}

export function Text({ children, ...rest }: Readonly<TextProps>) {
  return <PersonalisedText {...rest}>{children}</PersonalisedText>;
}
