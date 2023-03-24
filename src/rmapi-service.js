class RMapiService {
  _apiBase = "https://rickandmortyapi.com/api";

  getResource = async (url) => {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${url}` + `, received ${response.status}`
      );
    }

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

  getAllEpisodes = async (numpage) => {
    const response = await this.getResource(`/episode/?page=${numpage}`);
    return response.results.map(this._transformEpisode);
  };

  getSingleEpisode = async (id) => {
    const response = await this.getResource(`/episode/${id}`);
    return this._transformEpisode(response);
  };

  getCharacter = async (id) => {
    const character = await this.getResource(`/character/${id}`);

    if (character.length > 1) {
      return character.map(this._transformCharacter);
    } else {
      return this._transformCharacter(character);
    }
  };

  getCharacterEpisode = async (arr) => {
    const response = await this.getResource(`/episode/${arr}`);
    if (response.length > 1) {
      return response.map(this._transformEpisode);
    } else {
      return this._transformEpisode(response);
    }
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
    return item.map((element) => {
      return element.match(idRegExp)[1];
    });
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
      episode: this._extractId(character.episode),
    };
  };
  _transformEpisode = (episodeInfo) => {
    return {
      id: episodeInfo.id,
      name: episodeInfo.name,
      airdate: episodeInfo.air_date,
      episode: episodeInfo.episode,
      characters: this._extractId(episodeInfo.characters),
    };
  };
}
export default RMapiService;
