import React from "react";
import "./app.css";
import CharacterDetails from "../character-card";
import RMapiService from "../../rmapi-service";
import Header from "../header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundry from "../error-boundry";
import StartPage from "../start-page";
import CharacterList from "../character-list/character-list";

const RMservice = new RMapiService();

RMservice.getAllEpisodes();

class App extends React.Component {
  RMservice = new RMapiService();

  state = {
    selectedCharacter: null,
    page: 1,
    info: null,
  };

  onCharacterSelected = (selectedCharacter) => {
    this.setState({
      selectedCharacter,
    });
  };

  updatePage = (page) => {
    this.setState({
      page,
    });
  };

  render() {
    return (
      <div className="app">
        <ErrorBoundry>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route
                path="list"
                element={
                  <CharacterList
                    onCharacterSelected={this.onCharacterSelected}
                  />
                }
              />
              <Route
                path="character"
                element={
                  <CharacterDetails
                    charId={this.state.selectedCharacter}
                    data={this.RMservice.getCharacter}
                  />
                }
              />
              <Route
                path="character/:id"
                element={
                  <CharacterDetails
                    charId={this.state.selectedCharacter}
                    data={this.RMservice.getCharacter}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </ErrorBoundry>
      </div>
    );
  }
}
export default App;
