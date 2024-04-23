import { Col } from "antd";
import styled from "styled-components";

export const SwitchContainer = styled(Col)`
  .ant-switch {
    display: block;
    align-items: center;
    justify-content: center;
  }

  .ant-switch-inner {
    .ant-typography {
      font-size: ${({ theme }) => theme.fonts.small};
    }

    span {
      svg {
        font-size: ${({ theme }) => theme.fonts.small};
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

export const MenuContainer = styled(Col)`
  .ant-menu {
    border-bottom: 0px;
    background: transparent;

    .ant-menu-item {
      &:hover {
        &::after {
          border-bottom-width: 4px;
          border-bottom-color: ${({ theme }) => theme.colors.monochromatic.secondary};

          filter: brightness(1.2);
        }
      }
    }

    .ant-menu-item-selected {
      &::after {
        border-bottom-width: 4px;
        border-bottom-color: ${({ theme }) => theme.colors.monochromatic.secondary};
      }

      &:hover {
        &::after {
          border-bottom-width: 4px;
          border-bottom-color: ${({ theme }) => theme.colors.monochromatic.secondary};

          filter: brightness(0.9);
        }
      }
    }
  }
`;
