import { Col, Row } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";

import { useGetAuthors } from "@/hooks";
import { FilterRequest } from "./types";
import { Text } from "@/components/Text";
import { Title } from "@/components/Title";
import { CustomButton, TitleContainer } from "./styles";
import { Filter, AuthorsListTable, CreateAuthorModal } from "./components";

export function Authors() {
  let [searchParams] = useSearchParams();
  const queryParams = convertURLParamToObject(searchParams);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterRequest | undefined>(queryParams);

  const {
    error,
    isFetching,
    data: authors,
    isError: errorGettingAuthors,
  } = useGetAuthors(filter);

  if (errorGettingAuthors) {
    return (
      <Row>
        <Text>{error.message ?? "Error getting authors"}</Text>
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

  function handleNewAuthorClick(status: boolean) {
    setIsModalOpen(status);
  }

  return (
    <Row style={{ padding: "0 1rem" }} gutter={[16, 16]}>
      <Col xs={24}>
        <Row>
          <TitleContainer>
            <Title level={3} style={{ margin: 0 }}>
              Authors
            </Title>
          </TitleContainer>
        </Row>
      </Col>
      <Col xs={24}>
        <Row justify="end">
          <Col>
            <CustomButton
              type="primary"
              onClick={() => handleNewAuthorClick(true)}
            >
              <Row align="middle" justify="space-between">
                <Col>
                  <PlusCircleFilled />
                </Col>
                <Col xs={15}>New author</Col>
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
            <AuthorsListTable loading={isFetching} authors={authors} />
          </Col>
        </Row>
      </Col>
      {isModalOpen && (
        <CreateAuthorModal
          isModalOpen={isModalOpen}
          onNewAuthorClick={handleNewAuthorClick}
        />
      )}
    </Row>
  );
}
