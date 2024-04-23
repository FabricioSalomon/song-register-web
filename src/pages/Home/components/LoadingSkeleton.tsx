import { Button, Col, Row, Skeleton } from "antd";
import { TagOutlined } from "@ant-design/icons";
import React from "react";

import { CustomCard, KeyworkContainer } from "../styles";

interface LoadingSkeletonProps {}

export function LoadingSkeleton(props: Readonly<LoadingSkeletonProps>) {
  const fakeData = [1, 2, 3, 4];
  const fakeTagData = [1, 2];
  return (
    <Row gutter={[16, 16]}>
      {fakeData.map((id) => (
        <Col key={id} xs={12} lg={6} xl={5} xxl={4}>
          <CustomCard>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Skeleton paragraph={{ rows: 1 }} active />
              </Col>
              <Col xs={24}>
                <Row justify="start" gutter={[24, 8]}>
                  {fakeTagData.map((id) => (
                    <KeyworkContainer key={id} xs={24}>
                      <Button
                        size="small"
                        type="primary"
                        icon={<TagOutlined />}
                      >
                        <Skeleton.Input size="small" active />
                      </Button>
                    </KeyworkContainer>
                  ))}
                </Row>
              </Col>
            </Row>
          </CustomCard>
        </Col>
      ))}
    </Row>
  );
}
