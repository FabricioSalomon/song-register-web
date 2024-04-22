import { ColumnsType } from "antd/lib/table";
import { Table } from "antd";
import moment from "moment";
import React from "react";

import { Text } from "@/components/Text";
import { KeywordsResponse } from "@/hooks";
import { ActionsColumn } from "./ActionsColumn";

interface KeywordsListTableProps {
  loading: boolean;
  keywords: KeywordsResponse[];
}

export function KeywordsListTable({
  keywords,
  loading,
}: Readonly<KeywordsListTableProps>) {
  const columns: ColumnsType<KeywordsResponse> = [
    {
      key: 1,
      align: "center",
      dataIndex: "name",
      title: <Text>Name</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: 2,
      align: "center",
      dataIndex: "created_at",
      title: <Text>Date</Text>,
      render: (created_at: Date) => moment(created_at).format("L"),
      sorter: (a, b) =>
        moment(a.created_at).valueOf() - moment(b.created_at).valueOf(),
    },
    {
      key: 3,
      width: "15%",
      align: "center",
      dataIndex: "id",
      title: <Text>Actions</Text>,
      render: (id, keyword) => <ActionsColumn key={id} keyword={keyword} />,
    },
  ];

  return <Table loading={loading} dataSource={keywords} columns={columns} />;
}
