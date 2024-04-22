import { SearchOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { Button, Col, Form, Row } from "antd";
import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";

import { FilterCollapse } from "@/components/FilterCollapse";
import { FilterRequest, FormFields } from "../../types";
import { AuthorName } from "./AuthorName";

const { useForm } = Form;

interface FilterProps {
  queryParams: FilterRequest;
  onFilterClick: (filterData?: FilterRequest) => void;
}

export function Filter({ onFilterClick, queryParams }: Readonly<FilterProps>) {
  const [form] = useForm();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValues: FormFields = mapFilterInitialValues(queryParams) ?? {};

  function mapFilterInitialValues(queryParams: FilterRequest): FormFields {
    const { created_at_start, created_at_end } = queryParams;

    const created_at =
      created_at_start && created_at_end
        ? [moment(created_at_start), moment(created_at_end)]
        : undefined;

    const initialValues: FormFields = {
      ...queryParams,
      created_at,
    };
    return initialValues;
  }

  function handleFilter(filterData: FormFields): void {
    const mappedDataToRequest = mapFilterDataToRequest(filterData);
    updateURLParams(mappedDataToRequest);
    onFilterClick(mappedDataToRequest);
  }

  function mapFilterDataToRequest(filterData: FormFields): FilterRequest {
    const initialValues: FormFields = {
      ...filterData,
    };
    return initialValues;
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
    form.resetFields();
    setSearchParams("cleared=true");
    onFilterClick(undefined);
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
        initialValues={initialValues}
        onFieldsChange={handleFieldsChange}
      >
        <Col xs={24}>
          <Row gutter={8}>
            <Col xs={24} lg={8} xxl={6}>
              <AuthorName />
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
