import "./episod-list.css";
import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import RMapiService from "../../rmapi-service";
import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner";

const EpisodeList = ({ charId }) => {
  const RMapi = new RMapiService();

  const { id } = useParams();

  const [data, setData] = useState();

  const [countPages, setCountPages] = useState();

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

  useEffect(() => {
    haveEpisodeData();
  }, [page, id, charId]);

  async function dataExistIds() {
    const response = await RMapi.getCharacter(charId || id).then((results) => {
      setCountPages(results.episode);
      return results.episode;
    });

    const dataEpisods = await RMapi.getCharacterEpisode(response).then(
      (results) => {
        if (results.length > 1) {
          return results.map((item) => ({ ...item, key: item.id }));
        } else return [results];
      }
    );
    return setData(dataEpisods);
  }

  async function dataExistPage() {
    const episodes = await RMapi.getAllEpisodes(page).then((response) => {
      return response.results.map((item) => ({ ...item, key: item.id }));
    });
    const infoEpisodes = await RMapi.getAllEpisodes(page).then((response) => {
      return response.info.count;
    });
    return setData(episodes), setCountPages(infoEpisodes);
  }

  async function haveEpisodeData() {
    const isExistIds = Boolean(id) || Boolean(charId);
    const isExistPage = Boolean(page);

    switch (true) {
      case isExistIds:
        return dataExistIds();
      case isExistPage:
        return dataExistPage();
    }
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
        pageSize: 20,
        onChange: (page) => {
          setPage(page);
        },
        total: countPages,
      }}
    />
  );
};
export default EpisodeList;
