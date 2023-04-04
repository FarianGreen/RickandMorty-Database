import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./character-card.css";

const CharacterDetails = (props) => {
  const { id } = useParams();

  const [character, setCharacter] = useState();

  useEffect(() => {
    upadateCharacter();
  }, [props.charId || id]);

  function upadateCharacter() {
    const { charId, data } = props;

    if (!charId && !id) {
      return <div>no Id</div>;
    }

    data(charId || id).then((character) => {
      setCharacter(character);
    });
  }

  if (!character) {
    return <div>no character</div>;
  }

  const { image, name, type, location, gender, status } = character;
  const color = status.includes("Alive")
    ? "green"
    : status.includes("Dead")
    ? "red"
    : "gray";

  const sex = gender.includes("Male")
    ? "male"
    : gender.includes("Female")
    ? "female"
    : "unknown";
  return (
    <div className="wrapper__card">
      <div className="card">
        <img src={image} className="" alt="#" />

        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">last seen:</p>
          <p className="card-text">{location}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Status: <t className={color}>{status}</t>
          </li>
          <li className="list-group-item">
            Gender: <t className={sex}>{gender}</t>
          </li>
          <li className="list-group-item">{type}</li>
        </ul>
        <div className="card-body">
          <a href="#" class="card-link">
            Card link
          </a>
          <a className="#" class="card-link">
            <Link className="link-episode" to={`/episode_with_character/${id}`}>
              <span>Episodes with character</span>
              <span className="material-symbols-outlined my-menu">
                menu_open
              </span>
            </Link>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
