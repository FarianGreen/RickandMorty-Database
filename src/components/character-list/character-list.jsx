import React, { useState } from "react";
import { Table, Tag } from "antd";
import "./character-list.css";
import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner";
import { useCharacterList } from "../hooks/useCharactersList";

const CharacterList = (props) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { data, countPages } = useCharacterList(id, page);

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
      render: (_, record) => {
        return (
          <Link
            to={`/character/${record.id}`}
            onClick={() => props.onCharacterSelected(record.id)}
          >
            <span className="material-symbols-outlined my-menu">menu_open</span>
          </Link>
        );
      },
    },
  ];

  if (!data) {
    return (
      <div className="spin">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="wrapper__table">
      <Table
        className="table"
        columns={columns}
        dataSource={data}
        pagination={{
          showSizeChanger: false,
          current: page,
          pageSize: 20,
          onChange: (page) => {
            setPage(page);
          },
          total: countPages,
        }}
      />
    </div>
  );
};
export default CharacterList;
