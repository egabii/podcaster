import { useQuery } from "react-query"
import useQueryStorage from './useQueryStorage'
import fetchEpisodes from "../providers/episodes/fetchEpisodes"
import endpoints from "../providers/endpoints"
import { IEpisodesList } from "../providers/episodes/episodes.type"
import { useEffect } from "react"

export default function useEpisodes(podcastId) {
  const {storageData, setPreference} = useQueryStorage(endpoints.episodes(podcastId));

  const { isLoading, data: episodesList, ...rest } = useQuery<IEpisodesList, Error>(['episodes', podcastId], () => fetchEpisodes(podcastId), {
    enabled: storageData.contents.length === 0
  });

  useEffect(() => {
    if (isLoading === false && !!episodesList) {
      setPreference(episodesList);
    }
  }, [isLoading, episodesList]);

  return {
    ...rest,
    isLoading,
    data: storageData.contents as IEpisodesList
  };
}