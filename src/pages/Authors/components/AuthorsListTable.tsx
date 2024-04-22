import { ColumnsType } from "antd/lib/table";
import { Table } from "antd";
import moment from "moment";
import React from "react";

import { Text } from "@/components/Text";
import { AuthorsResponse } from "@/hooks";
import { ActionsColumn } from "./ActionsColumn";

interface AuthorsListTableProps {
  loading: boolean;
  authors: AuthorsResponse[];
}

export function AuthorsListTable({
  authors,
  loading,
}: Readonly<AuthorsListTableProps>) {
  const columns: ColumnsType<AuthorsResponse> = [
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
      align: "center",
      dataIndex: "songs_registered",
      title: <Text>Songs</Text>,
      sorter: (a, b) => a.songs_registered - b.songs_registered,
    },
    {
      key: 4,
      width: "10%",
      align: "center",
      dataIndex: "id",
      title: <Text>Actions</Text>,
      render: (id, author) => <ActionsColumn key={id} author={author} />,
    },
  ];

  return <Table loading={loading} dataSource={authors} columns={columns} />;
}
