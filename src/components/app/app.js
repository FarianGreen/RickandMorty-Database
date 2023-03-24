import React, { useState } from "react";
import "./app.css";
import CharacterDetails from "../character-card";
import RMapiService from "../../rmapi-service";
import Header from "../header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundry from "../error-boundry";
import StartPage from "../start-page";
import CharacterList from "../character-list/character-list";
import Menu from "../menu/menu";
import EpisodeList from "../episod-list";
import Row from "../row";

const App = () => {
  const RMservice = new RMapiService();

  const [characterId, setCharacterId] = useState();
  const [page, setPage] = useState(1);
  const [menuActive, setMenuActive] = useState(false);

  const onCharacterSelected = (characterId) => {
    setCharacterId(characterId);
  };

  const items = [
    {
      id: 1,
      value: "Character List",
      href: "/list",
    },
    {
      id: 2,
      value: "List of episodes",
      href: "/episode",
    },
    {
      id: 3,
      value: "Home page",
      href: "/",
    },
  ];
  return (
    <div className="app">
      <ErrorBoundry>
        <BrowserRouter>
          <Header menuActive={menuActive} setMenuActive={setMenuActive} />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/episode" element={<EpisodeList />} />
            <Route
              path="list"
              element={
                <CharacterList onCharacterSelected={onCharacterSelected} />
              }
            />
            <Route
              path="character"
              element={
                <CharacterDetails
                  charId={characterId}
                  data={RMservice.getCharacter}
                />
              }
            />
            <Route
              path="character/:id"
              element={
                <CharacterDetails
                  charId={characterId}
                  data={RMservice.getCharacter}
                />
              }
            />

            <Route
              path="episode_with_character/:id"
              element={<EpisodeList charId={characterId} />}
            />

            <Route
              path="characters_in_episode/:id"
              element={
                <CharacterList onCharacterSelected={onCharacterSelected} />
              }
            />
          </Routes>
          <Menu
            active={menuActive}
            setActive={setMenuActive}
            header={"Menu"}
            items={items}
          />
        </BrowserRouter>
      </ErrorBoundry>
    </div>
  );
};

export default App;
