import { Button, Col, Dropdown, Row } from "antd";
import styled from "styled-components";

export const ActionsColumnContainer = styled(Col)`
  .inline {
    display: none;
  }

  .hamburger-menu {
    display: block;

    span {
      svg {
        fill: #202020;
        font-size: 1.2rem;
      }
    }
  }

  @media (min-width: 1280px) {
    .inline {
      display: block;
    }

    .hamburger-menu {
      display: none;
    }
  }
`;

export const ActionsButtonsContainer = styled(Row)`
  .ant-col {
    button {
      border: none;
      color: ${({ theme }) => theme.colors.shadow.primary};

      border-radius: 5px;

      .ant-col {
        padding: 0 !important;
      }

      span {
        svg {
          width: 1rem;
          height: 1rem;
          font-size: 1rem;

          @media (min-width: 1366px) {
            width: 1.4rem;
            height: 1.4rem;
            font-size: 1.4rem;
          }
          @media (min-width: 1920px) {
            width: 1.5rem;
            height: 1.5rem;
            font-size: 1.5rem;
          }
        }
      }

      &:disabled {
        span {
          color: #b3b3b3;
        }
      }

      &:hover:not(:disabled) {
        background-color: ${({ theme }) =>
          `${theme.colors.shadow.quaternary}55`} !important;

        span {
          color: #ffffff;
        }
      }
    }

    button.ant-btn-dangerous {
      color: #ff4d4f !important;

      &:hover:not(:disabled) {
        background-color: #ff4d4f !important;

        span {
          color: #ffffff;
        }
      }
    }
  }
`;

export const DeleteButtonContainer = styled.div`
  &:hover {
    span {
      color: #ffffff;
    }
  }
`;

export const Hamburger = styled(Dropdown)``;

export const HamburgerButton = styled(Button)`
  color: ${({ theme }) => theme.fontColor};

  &:hover {
    color: ${({ theme }) => theme.colors.shadow.secondary} !important;
  }
`;
