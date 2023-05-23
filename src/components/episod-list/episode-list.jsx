import "./episod-list.css";
import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";

import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner";
import { useEpisodeList } from "../hooks/useEpisodeList";

const EpisodeList = ({ charId }) => {
  const { id } = useParams();

  const [page, setPage] = useState(1);

  const columns = [
    {
      key: "0",
      title: "Name",
      dataIndex: "name",
      width: "20%",
      render: (tag) => {
        return <Tag color={"rgb(95, 158, 51)"}>{tag}</Tag>;
      },
    },
    {
      key: "1",
      title: "Date",
      dataIndex: "airdate",
      sorter: (record1, record2) => {
        return record1.airdate > record2.airdate;
      },
      width: "20%",
      render: (tag) => {
        return <Tag color={"rgb(53, 168, 168)"}>{tag}</Tag>;
      },
    },
    {
      key: "2",
      title: "Episode",
      dataIndex: "episode",
      sorter: (record1, record2) => {
        return record1.airdate > record2.airdate;
      },
      width: "20%",
      render: (tag) => {
        return <Tag color={"rgb(159, 255, 16)"}>{tag}</Tag>;
      },
    },
    {
      key: "3",
      title: "Action",
      dataIndex: "action",
      width: "20%",
      render: (_, record) => {
        return (
          <Link to={`/characters_in_episode/${record.id}`}>
            <span className="material-symbols-outlined my-menu">menu_open</span>
          </Link>
        );
      },
    },
  ];

  const { data, countPages } = useEpisodeList(charId, id, page);

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
export default EpisodeList;
