import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import RMapiService from "../../rmapi-service";

const PaginationPage = () => {
  const RMapi = new RMapiService();

  const [data, setData] = useState();

  const [page, setPage] = useState(1);

  const columns = [
    { key: "0", title: "ID", dataIndex: "id" },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      key: "1",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
        {
          text: "Alien",
          value: "Alien",
        },
        {
          text: "Unknown",
          value: "unknown",
        },
        ,
        {
          text: "Genderless",
          value: "Genderless",
        },
      ],
      onFilter: (value, item) => item.gender.includes(value),

      width: "20%",
      key: "2",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Alive",
          value: "Alive",
        },
        {
          text: "Dead",
          value: "Dead",
        },
        {
          text: "Unknown",
          value: "unknown",
        },
      ],
      onFilter: (value, item) => item.status.includes(value),
      render: (tag) => {
        const color = tag.includes("Alive")
          ? "Green"
          : tag.includes("Dead")
          ? "red"
          : "gray";
        return <Tag color={color}>{tag}</Tag>;
      },
      key: "3",
    },
    {
      title: "Species",
      dataIndex: "species",
      key: "4",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "5",
    },
  ];

  useEffect(() => {
    haveData();
  }, [page]);

  async function haveData() {
    if (!page) {
      return;
    }

    const respData = await RMapi.getAllCharacters(page).then((results) =>
      results.map((item) => ({ ...item, key: item.id }))
    );
    return setData(respData);
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        showSizeChanger: false,
        current: page,
        pageSize: 20,
        onChange: (page) => {
          setPage(page);
        },
        total: 826,
      }}
    />
  );
};
export default PaginationPage;
