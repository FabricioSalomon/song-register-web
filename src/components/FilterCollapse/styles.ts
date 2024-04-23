import { Collapse } from "antd";
import styled from "styled-components";

export const CollapseContainer = styled(Collapse)`
  border-radius: 0.5rem;

  .ant-collapse-item-disabled {
    background-color: #b3b3b3;

    .ant-collapse-header {
      border-radius: 0.5rem;
    }
  }

  .ant-collapse-item {
    border: none;
    border-radius: 0.5rem;

    .ant-collapse-header {
      padding: 0 16px;
      height: 50px;
      display: flex;
      align-items: center;
      flex-direction: row;
      border-radius: 0.5rem;
      color: ${({ theme }) => theme.fontColor};

      .ant-collapse-header-text {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
      }
    }

    .ant-collapse-content-active {
      border-radius: 0.5rem;
    }

    &:last-child {
      border-radius: 0.5rem;
      .ant-collapse-header {
        border-radius: 0.5rem;
      }
    }
  }

  .ant-collapse-item-active {
    border-radius: 0.5rem;
  }
`;
