import { Form } from "antd";
import React from "react";

import { useCreateKeyword, useGetKeywords } from "@/hooks";
import { SelectWithCreation } from "@/components/SelectWithCreation";

interface KeywordsProps {}

const { useFormInstance } = Form;

export function Keywords(props: Readonly<KeywordsProps>) {
  const form = useFormInstance();

  const fieldName = "keywords_ids";

  const {
    data: keywords,
    isFetching: isGettingKeywords,
    isError: errorGettingKeywords,
  } = useGetKeywords();
  const { mutateAsync: create } = useCreateKeyword();

  function handleSelectKeyword(id: string) {
    form.setFieldValue(fieldName, id);
  }

  function handleClearKeyword() {
    form.resetFields([fieldName]);
  }

  async function handleCreate(name: string) {
    const created = await create({
      name,
    });
    if (created?.id) {
      const keywords = form.getFieldValue(fieldName);
      form.setFieldValue(fieldName, [...(keywords ?? []), created.id]);
    }
  }

  return (
    <Form.Item
      label="Keywords"
      labelAlign="left"
      labelCol={{ xs: 24 }}
      name={fieldName}
      rules={[
        {
          required: true,
          message: "Select at least one keyword",
        },
      ]}
    >
      <SelectWithCreation
        showSearch
        allowClear
        allowCreation
        mode="multiple"
        maxCount={4}
        placeholder="Keywords"
        onCreate={handleCreate}
        selectOptions={keywords}
        loading={isGettingKeywords}
        onClear={handleClearKeyword}
        onChange={handleSelectKeyword}
        disabled={!keywords || errorGettingKeywords}
      />
    </Form.Item>
  );
}
