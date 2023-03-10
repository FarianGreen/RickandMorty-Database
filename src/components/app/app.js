import React from "react";
import "./app.css";
import CharacterDetails from "../character-card";
import CharacterList from "../character-list/character-list";
import RMapiService from "../../rmapi-service";
import Header from "../header";
import Row from "../row";
import PaginationPage from "../pagination-page/pagination-page";

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
        <Header
          data={this.RMservice.getInfo}
          updatePage={this.updatePage}
          page={this.state.page}
        />
        {/* <Row
          left={
            <CharacterList
              getData={this.RMservice.getAllCharacters}
              onCharacterSelected={this.onCharacterSelected}
              page={this.state.page}
            />
          }
          right={<CharacterDetails charId={this.state.selectedCharacter} data={this.RMservice.getCharacter} />}
        /> */}

        <PaginationPage/>
      </div>
    );
  }
}
export default App;
