import { useEffect, useState } from "react";
import RMapiService from "../../rmapi-service";

export function useEpisodeList(charId, id, page) {
  const RMapi = new RMapiService();

  const [data, setData] = useState();

  const [countPages, setCountPages] = useState();

  useEffect(() => {
    haveEpisodeData();
  }, [page, id, charId]);

  async function dataExistIds() {
    const response = await RMapi.getCharacter(charId || id).then((results) => {
      setCountPages(results.episode);
      return results.episode;
    });

    const dataEpisods = await RMapi.getCharacterEpisode(response).then(
      (results) => {
        if (results.length > 1) {
          return results.map((item) => ({ ...item, key: item.id }));
        } else return [results];
      }
    );
    return setData(dataEpisods);
  }

  async function dataExistPage() {
    const episodes = await RMapi.getAllEpisodes(page).then((response) => {
      return response.results.map((item) => ({ ...item, key: item.id }));
    });
    const infoEpisodes = await RMapi.getAllEpisodes(page).then((response) => {
      return response.info.count;
    });
    return setData(episodes), setCountPages(infoEpisodes);
  }

  async function haveEpisodeData() {
    const isExistIds = Boolean(id) || Boolean(charId);
    const isExistPage = Boolean(page);

    switch (true) {
      case isExistIds:
        return dataExistIds();
      case isExistPage:
        return dataExistPage();
    }
  }

  return { data, countPages };
}
