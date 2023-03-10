class RMapiService {
  _apiBase = "https://rickandmortyapi.com/api";

  getResource = async (url) => {
    const response = await fetch(`${this._apiBase}${url}`);
    return await response.json();
  };

  getAllCharacters = async (numpage) => {
    const response = await this.getResource(`/character/?page=${numpage}`);
    return response.results.map(this._transformCharacter);
  };

  getLocations = async (numpage) => {
    const response = await this.getResource(`/location/?page=${numpage}`);
    return console.log(response.results);
  };

  getEpisodes = async (numpage) => {
    const response = await this.getResource(`/episode/?page=${numpage}`);
    return console.log(response.results);
  };

  getCharacter = async (id) => {
    const character = await this.getResource(`/character/${id}`);
    return this._transformCharacter(character);
  };

  getInfo = async (numpage) => {
    const response = await this.getResource(`/character/?page=${numpage}`);
    return this._transformInfo(response.info);
  };

  _extractId = (item) => {
    if (item === null) {
      return;
    }
    const idRegExp = /([0-9]*)$/;
    return item.match(idRegExp)[1];
  };

  _transformInfo = (info) => {
    return {
      count: info.count,
      pages: info.pages,
      next: this._extractId(info.next),
      prev: this._extractId(info.prev),
    };
  };

  _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      image: character.image,
      location: character.location.name,
      origin: character.origin.name,
    };
  };
}
export default RMapiService;
