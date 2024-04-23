import { SearchOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { Button, Col, Form, Row } from "antd";
import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";

import { FilterCollapse } from "@/components/FilterCollapse";
import { FilterRequest, FormFields } from "../types";
import { KeywordName } from "./KeywordName";
import { ReleasedAt } from "./ReleasedAt";
import { SongName } from "./SongName";
import { Authors } from "./Authors";

const { useForm } = Form;

interface FilterProps {
  queryParams: FilterRequest;
  onFilterClick: (filterData?: FilterRequest) => void;
}

export function Filter({ onFilterClick, queryParams }: Readonly<FilterProps>) {
  const [form] = useForm();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilter(filterData: FormFields): void {
    const mappedDataToRequest = mapFilterDataToRequest(filterData);
    updateURLParams(mappedDataToRequest);
    onFilterClick(mappedDataToRequest);
  }

  function mapFilterDataToRequest(filterData: FormFields): FilterRequest {
    const { released_at, author_id, keyword, name } = filterData;
    let [released_at_start, released_at_end]: (string | undefined)[] = [
      undefined,
      undefined,
    ];

    if (released_at) {
      const [start, end] = released_at;
      [released_at_start, released_at_end] = [
        moment(new Date(start.format())).format("YYYY/MM/DD"),
        moment(new Date(end.format())).format("YYYY/MM/DD"),
      ];
    }
    const values: FilterRequest = {
      name,
      keyword,
      author_id,
      released_at_end,
      released_at_start,
    };
    return values;
  }

  function updateURLParams(params: FilterRequest): void {
    for (const key in params) {
      searchParams.delete("cleared");
      searchParams.delete(key);
      if (Object.hasOwn(params, key)) {
        const typedKey: keyof FilterRequest = key as any;
        const param = params[typedKey];
        if (param && !_.isArray(param)) {
          searchParams.set(key, param);
        } else if (_.isArray(param)) {
          searchParams.set(key, JSON.stringify([...param]));
        }
      }
    }

    setSearchParams(searchParams.toString());
  }

  function handleFieldsChange(_changedFields: any, allFields: any[]): void {
    const allFieldsEmpty = allFields?.filter((field) => !!field.value);
    if (allFieldsEmpty.length === 0) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }

  function handleClear(): void {
    onFilterClick(undefined);
    setSearchParams("cleared=true");
    form.setFieldValue("name", undefined);
    form.setFieldValue("keyword", undefined);
    form.setFieldValue("author_id", undefined);
    form.setFieldValue("released_at", undefined);
  }

  const queryParamsArray = Object.keys(queryParams);
  const hasSearchParams = queryParamsArray.length > 0;
  const cleared = queryParamsArray[0] === "cleared";

  return (
    <FilterCollapse hasSearchParams={hasSearchParams}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFilter}
        initialValues={queryParams}
        onFieldsChange={handleFieldsChange}
      >
        <Col xs={24}>
          <Row gutter={8}>
            <Col xs={24} lg={8} xxl={6}>
              <SongName />
            </Col>
            <Col xs={24} lg={8} xxl={6}>
              <Authors />
            </Col>
            <Col xs={24} lg={8} xxl={6}>
              <KeywordName />
            </Col>
            <Col xs={24} lg={8} xxl={6}>
              <ReleasedAt />
            </Col>
          </Row>
        </Col>
        <Row gutter={[8, 8]} style={{ paddingTop: "20px" }}>
          <Col xs={24} sm={12} lg={4}>
            <Button
              onClick={handleClear}
              style={{ width: "100%" }}
              disabled={disabled && (!hasSearchParams || cleared)}
            >
              Clear
            </Button>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabled}
              style={{ width: "100%" }}
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </FilterCollapse>
  );
}
