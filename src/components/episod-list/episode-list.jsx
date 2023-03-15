import "./episod-list.css";
import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import RMapiService from "../../rmapi-service";
import { Link } from "react-router-dom";
import Spinner from "../spinner";

const EpisodeList = () => {
  const RMapi = new RMapiService();

  const [data, setData] = useState();

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
      title: "Characters",
      dataIndex: "characters",
      width: "20%",
      render: (_, record) => {
        return (
          <li>
            <span className="material-symbols-outlined my-menu">menu_open</span>
          </li>
        );
      },
    },
  ];

  useEffect(() => {
    haveEpisodeData();
  }, [page]);

  async function haveEpisodeData() {
    if (!page) {
      return;
    }

    const respData = await RMapi.getAllEpisodes(page).then((results) =>
      results.map((item) => ({ ...item, key: item.id }))
    );
    return setData(respData);
  }

  if (!data) {
    return (
      <div className="spin">
        <Spinner />
      </div>
    );
  }

  return (
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
        total: 51,
      }}
    />
  );
};
export default EpisodeList;
