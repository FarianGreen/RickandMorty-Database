import { useState, useEffect } from "react";
import RMapiService from "../../rmapi-service";

export function useCharacterList(id, page) {
  const RMapi = new RMapiService();
  const [countPages, setCountPages] = useState();

  const [data, setData] = useState();

  useEffect(() => {
    haveData();
  }, [page, id]);

  async function dataExistIds() {
    const response = await RMapi.getSingleEpisode(id).then((results) => {
      setCountPages(results.characters);
      return results.characters;
    });

    const dataCharactersInEpisod = await RMapi.getCharacter(response).then(
      (results) => {
        if (results.length > 1) {
          return results.map((item) => ({ ...item, key: item.id }));
        } else return [results];
      }
    );
    return setData(dataCharactersInEpisod);
  }

  async function dataExistPage() {
    const charactersList = await RMapi.getAllCharacters(page).then(
      (response) => {
        return response.results.map((item) => ({ ...item, key: item.id }));
      }
    );
    const infoCharacters = await RMapi.getAllCharacters(page).then(
      (response) => {
        return response.info;
      }
    );
    return setData(charactersList), setCountPages(infoCharacters.count);
  }

  async function haveData() {
    const isExistId = Boolean(id);
    const isExistPage = Boolean(page);

    switch (true) {
      case isExistId:
        return dataExistIds();
      case isExistPage:
        return dataExistPage();
    }
  }

  return { data, countPages };
}
