import { Card, Col, Row } from "antd";
import styled from "styled-components";

export const ProjectContainer = styled(Row)`
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const KeyworkContainer = styled(Col)`
  button {
    cursor: auto;
    display: flex;
    align-items: center;
  }
`;

export const CustomCard = styled(Card)`
  cursor: pointer;
  height: 320px;
  max-width: 350px;

  transition: all 0.4s;
  &:hover {
    filter: brightness(0.8);
  }
`;
