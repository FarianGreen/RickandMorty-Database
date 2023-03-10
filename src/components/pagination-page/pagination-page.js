import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import RMapiService from "../../rmapi-service";
import "./pagination-page.css";
import { Link } from "react-router-dom";

const PaginationPage = (props) => {
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
      width: "15%",
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

      render: (tag) => {
        const color = tag.includes("Male")
          ? "blue"
          : tag.includes("Female")
          ? "pink"
          : "rgb(171, 166, 166)";
        return (
          <Tag className="tag" color={color}>
            {tag}
          </Tag>
        );
      },

      width: "15%",
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
          ? "green"
          : tag.includes("Dead")
          ? "red"
          : "rgb(171, 166, 166)";
        return (
          <Tag className="tag" color={color}>
            {tag}
          </Tag>
        );
      },
      width: "15%",
      key: "3",
    },
    {
      title: "Species",
      dataIndex: "species",
      width: "15%",
      key: "4",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      width: "20%",
      key: "5",
    },
    {
      title: "Details",
      dataIndex: "details",
      width: "20%",
      key: "6",
      render: (id=3) => {
        return (
          <Link to="/details">
            <span className="material-symbols-outlined my-menu" onClick={() => props.onCharacterSelected(id)}>menu_open</span>
          </Link>
        );
      },
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
