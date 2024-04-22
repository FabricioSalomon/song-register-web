import { Button, Col } from "antd";
import styled from "styled-components";

export const TitleContainer = styled(Col)`
  position: relative;
`;

export const CustomButton = styled(Button)`
  width: 150px;
  height: 35px;
  display: flex;
  padding: 0 0.8rem;
  border-radius: 5px;
  align-items: center;

  .ant-row {
    margin: 0;
    .ant-col {
      margin: 0;
      :first-child {
        display: flex;
        align-items: center;
        span {
          margin: 0 1rem 0 0;
          svg {
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  @media (min-width: 1280px) {
    right: 12px;
  }
`;
