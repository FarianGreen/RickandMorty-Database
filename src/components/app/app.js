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
import MountingScript from "../menu/logick";

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
      value: "Home",
      href: "/",
      icon: "home",
    },
    {
      id: 2,
      value: "Characters List",
      href: "/list",
      icon: "settings_accessibility",
    },
    {
      id: 3,
      value: "Episodes",
      href: "/episode",
      icon: "density_small",
    },
  ];
  return (
    <div className="app">
      <ErrorBoundry>
        <BrowserRouter>
          <Header menuActive={menuActive} setMenuActive={setMenuActive} items={items}/>
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
        </BrowserRouter>
        <MountingScript/>
      </ErrorBoundry>
    </div>
  );
};

export default App;
