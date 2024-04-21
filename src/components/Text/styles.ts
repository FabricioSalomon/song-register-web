import { Typography } from "antd";
import styled from "styled-components";

export const PersonalisedText = styled(Typography.Text)`
  font-size: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.monochromatic.primary};
`;
