import React, { useState, useEffect } from "react";
import "./character-card.css";

const CharacterDetails = (props) => {
  const [character, setCharacter] = useState();

  useEffect(() => {
    upadateCharacter();
  }, [props.charId]);

  function upadateCharacter() {
    const { charId, data } = props;

    if (!charId) {
      return <div>no Id</div>;
    }

    data(charId).then((character) => {
      setCharacter(character);
    });
  }

  if (!character) {
    return <div>no character</div>;
  }

  const { image, name, status, location, gender } = character;
  return (
    <div className="card-box">
      <div className="card-box__ImgWrapper">
        <img src={image} alt="#" />
      </div>
      <div className="card-box__characterInfo">
        <div className="character-name-status">
          <span className="name">{name}</span>
          <span className="status">
            <span className="span-status">?</span> {status}
          </span>
        </div>
        <div className="card-box__other-info">
          <div className="last-location">
            <span className="text-grey">Last known location: </span>
            <span className="last-location__info">{location}</span>
          </div>
          <div className="first-seen">
            <span className="text-grey">Gender: </span>
            <span className="last-location__info">{gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
