import { Col, Row } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";

import { useGetKeywords } from "@/hooks";
import { FilterRequest } from "./types";
import { Text } from "@/components/Text";
import { Title } from "@/components/Title";
import { CustomButton, TitleContainer } from "./styles";
import { Filter, KeywordsListTable, CreateKeywordModal } from "./components";

export function Keywords() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryParams = convertURLParamToObject(searchParams);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterRequest | undefined>(queryParams);

  const {
    error,
    isFetching,
    data: keywords,
    isError: errorGettingKeywords,
  } = useGetKeywords(filter);

  if (errorGettingKeywords) {
    return (
      <Row>
        <Text>{error.message ?? "Error getting keywords"}</Text>
      </Row>
    );
  }

  function handleFilterClick(filterData?: FilterRequest) {
    setFilter(filterData);
  }

  function convertURLParamToObject(
    searchParams: URLSearchParams
  ): FilterRequest {
    const params = Object.fromEntries(searchParams.entries());
    return params as FilterRequest;
  }

  function handleNewKeywordClick(status: boolean) {
    setIsModalOpen(status);
  }

  return (
    <Row style={{ padding: "0 1rem" }} gutter={[16, 16]}>
      <Col xs={24}>
        <Row>
          <TitleContainer>
            <Title level={3} style={{ margin: 0 }}>
              Keywords
            </Title>
          </TitleContainer>
        </Row>
      </Col>
      <Col xs={24}>
        <Row justify="end">
          <Col>
            <CustomButton
              type="primary"
              onClick={() => handleNewKeywordClick(true)}
            >
              <Row align="middle" justify="space-between">
                <Col>
                  <PlusCircleFilled />
                </Col>
                <Col xs={16}>New keyword</Col>
              </Row>
            </CustomButton>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <Row>
          <Col xs={24}>
            <Filter
              onFilterClick={handleFilterClick}
              queryParams={queryParams}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <Row>
          <Col xs={24}>
            <KeywordsListTable loading={isFetching} keywords={keywords} />
          </Col>
        </Row>
      </Col>
      {isModalOpen && (
        <CreateKeywordModal
          isModalOpen={isModalOpen}
          onNewKeywordClick={handleNewKeywordClick}
        />
      )}
    </Row>
  );
}
