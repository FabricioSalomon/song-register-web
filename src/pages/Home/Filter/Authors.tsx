import { useGetAuthors } from "@/hooks";
import { Form } from "antd";
import React from "react";

interface AuthorsProps {}

const { useFormInstance, useWatch } = Form;

export function Authors(props: Readonly<AuthorsProps>) {
  const form = useFormInstance();
  const name = useWatch("author_name", form);

  const {
    error,
    isFetching: fetchingAuthors,
    data: authors,
    isError: errorGettingAuthors,
  } = useGetAuthors({
    name,
  });

  return <div>Authors</div>;
}
