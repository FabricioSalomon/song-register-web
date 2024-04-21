import { Col } from "antd";
import styled from "styled-components";

export const SwitchContainer = styled(Col)`
  .ant-switch {
    display: block;
    align-items: center;
    justify-content: center;
  }

  .ant-switch-inner {
    color: ${({ theme }) => theme.colors.monochromatic.tertiary};

    .ant-typography {
      font-size: ${({ theme }) => theme.fonts.small};
    }

    span {
      svg {
        font-size: ${({ theme }) => theme.fonts.small};
        color: ${({ theme }) => theme.colors.monochromatic.primary};
      }
    }
  }

  .ant-switch-checked {
    background: ${({ theme }) => theme.colors.monochromatic.secondary};

    &:hover:not(.ant-switch-disabled) {
      filter: brightness(0.9);
      background: ${({ theme }) => theme.colors.monochromatic.secondary};
    }
  }
`;
