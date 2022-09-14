import axios from 'axios'
import endpoints from '../endpoints'
import { IEpisodesList } from './episodes.type'

export default async function fetchEpisodes(podcastId) {
  let episodesList: IEpisodesList = [];
  const endpointEpisodes = endpoints.episodes(podcastId);
  try {
    const response = await axios.get(endpointEpisodes);
    episodesList = response.data.results;
  }catch(error) {
    console.error(error);
  } finally {
    return episodesList;
  }
};