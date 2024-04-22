import { Collapse } from "antd";
import styled from "styled-components";

export const CollapseContainer = styled(Collapse)`
  border-radius: 0.5rem;

  .ant-collapse-item {
    border-radius: 0.5rem;
    border: none;

    .ant-collapse-header {
      border-radius: 0.5rem;
	  color: ${({ theme }) => theme.fontColor};

      .ant-collapse-header-text {
        width: 100%;
      }
    }

    .ant-collapse-content-active {
      border-radius: 0 0 0.5rem 0.5rem;
    }
  }

  .ant-collapse-item-active {
    border-radius: 0.5rem;
  }
`;
