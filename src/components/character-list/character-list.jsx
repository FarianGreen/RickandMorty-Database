import React, { useState, useEffect } from "react";
import "./character-list.css";

const CharacterList = (props) => {
  const [list, setList] = useState();

  useEffect(() => {
    updateList();
  }, [props.page]);

  function updateList() {
    const { page, getData } = props;

    if (!page) {
      return;
    }
    getData(page).then((list) => {
      setList(list);
    });
  }

  function renderItems(arr) {
    return arr.map(({ id, name, species }) => {
      return (
        <li
          className="list-item"
          key={id}
          onClick={() => props.onCharacterSelected(id)}
        >
          {name} ({species})
        </li>
      );
    });
  }

  if (!list) {
    return <div>нет списка преснажей</div>;
  }

  const items = renderItems(list);
  return (
    <div>
      <ul className="ul-items">{items}</ul>
    </div>
  );
};

export default CharacterList;
