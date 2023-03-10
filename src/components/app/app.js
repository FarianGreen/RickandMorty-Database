import React from "react";
import "./app.css";
import CharacterDetails from "../character-card";
import CharacterList from "../character-list/character-list";
import RMapiService from "../../rmapi-service";
import Header from "../header";
import Row from "../row";
import PaginationPage from "../pagination-page/pagination-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends React.Component {
  RMservice = new RMapiService();

  state = {
    selectedCharacter: 1,
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
      <div>
        <BrowserRouter>
          <Header
            data={this.RMservice.getInfo}
            updatePage={this.updatePage}
            page={this.state.page}
          />
          <Routes>
            <Route path="/list" element={<PaginationPage onCharacterSelected={this.onCharacterSelected}/>} />
            <Route
              path="/details"
              element={
                <CharacterDetails
                  charId={this.state.selectedCharacter}
                  data={this.RMservice.getCharacter}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
