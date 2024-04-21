import { Col } from "antd";
import styled from "styled-components";

export const ProjectContainer = styled(Col)`
  height: 100vh;
  color: ${({ theme }) => theme.colors.monochromatic.primary};

  ${({ theme }) => {
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.colors.monochromatic.primary;
    return "";
  }};
`;
