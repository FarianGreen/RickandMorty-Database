import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import RMapiService from "../../rmapi-service";
import "./character-list.css";
import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner";

const CharacterList = (props) => {
  const RMapi = new RMapiService();

  const { id } = useParams();

  const [countPages, setCountPages] = useState();

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

  useEffect(() => {
    haveData();
  }, [page, id]);

  async function dataExistIds() {
    const response = await RMapi.getSingleEpisode(id).then((results) => {
      setCountPages(results.characters);
      return results.characters;
    });

    const dataCharactersInEpisod = await RMapi.getCharacter(response).then(
      (results) => {
        if (results.length > 1) {
          return results.map((item) => ({ ...item, key: item.id }));
        } else return [results];
      }
    );
    return setData(dataCharactersInEpisod);
  }

  async function dataExistPage() {
    const charactersList = await RMapi.getAllCharacters(page).then(
      (response) => {
        return response.results.map((item) => ({ ...item, key: item.id }));
      }
    );
    const infoCharacters = await RMapi.getAllCharacters(page).then(
      (response) => {
        return response.info;
      }
    );
    return setData(charactersList), setCountPages(infoCharacters.count);
  }

  async function haveData() {
    const isExistId = Boolean(id);
    const isExistPage = Boolean(page);

    switch (true) {
      case isExistId:
      return  dataExistIds();
      case isExistPage:
      return  dataExistPage();
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
        current: page,
        pageSize: 20,
        onChange: (page) => {
          setPage(page);
        },
        total: countPages,
      }}
    />
  );
};
export default CharacterList;
