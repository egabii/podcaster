import { useQuery } from "react-query"
import useQueryStorage from './useQueryStorage'
import fetchPodcasts from "../providers/podcasts/fetchPodcast"
import endpoints from "../providers/endpoints"
import { IPodcastList } from "../providers/podcasts/podcasts.type"
import { useEffect } from "react"

export default function usePodcasts() {
  const {storageData, setPreference} = useQueryStorage(endpoints.podcasts());

  const { isLoading, data:podcastList, ...rest } = useQuery<IPodcastList, Error>('podcasts', fetchPodcasts, {
    enabled: storageData.contents.length === 0
  });

  useEffect(() => {
    if (isLoading === false && !!podcastList) {
      setPreference(podcastList);
    }
  }, [isLoading, podcastList]);

  return {
    ...rest,
    isLoading,
    data: storageData.contents as IPodcastList
  };
}