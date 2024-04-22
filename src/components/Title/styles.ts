import { Typography } from "antd";
import styled from "styled-components";

export const CustomTitle = styled(Typography.Title)`
  color: ${({ theme }) => theme.fontColor} !important;
`;
