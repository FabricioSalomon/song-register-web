import { Form } from "antd";
import React from "react";

import { useCreateAuthor, useGetAuthors } from "@/hooks";
import { SelectWithCreation } from "@/components/SelectWithCreation";

interface AuthorsProps {}

const { useFormInstance } = Form;

export function Authors(props: Readonly<AuthorsProps>) {
  const form = useFormInstance();

  const fieldName = "author_id";

  const {
    data: authors,
    isFetching: isGettingAuthors,
    isError: errorGettingAuthors,
  } = useGetAuthors();

  const { mutateAsync: create } = useCreateAuthor();

  function handleSelectAuthor(id: string) {
    form.setFieldValue(fieldName, id);
  }

  function handleClearAuthor() {
    form.resetFields([fieldName]);
  }

  async function handleCreate(name: string) {
    const created = await create({
      name,
    });
    if (created?.id) {
      form.setFieldValue(fieldName, created.id);
    }
  }

  return (
    <Form.Item
      label="Authors"
      labelAlign="left"
      labelCol={{ xs: 24 }}
      name={fieldName}
    >
      <SelectWithCreation
        showSearch
        allowClear
        placeholder="Authors"
        onCreate={handleCreate}
        selectOptions={authors}
        loading={isGettingAuthors}
        onClear={handleClearAuthor}
        onChange={handleSelectAuthor}
        disabled={!authors || errorGettingAuthors}
      />
    </Form.Item>
  );
}
