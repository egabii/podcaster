import axios from 'axios';
import endpoints from '../endpoints';
import { IEpisodesList } from './episodes.type';
import { saveItem, getItem } from '../cache/client';

export default async function fetchEpisodes(podcastId) {
  let episodesList: IEpisodesList = [];
  const endpointEpisodes = endpoints.episodes(podcastId);
  try {
  /* TO-DO: compare date then refetch if date is more than 1 day after last fetching */
    const item = getItem(endpointEpisodes);
    if ( item.contents.length === 0 ) {
      const response = await axios.get(endpointEpisodes);
      saveItem(endpointEpisodes, response.data.results);
      episodesList = response.data.results;
    } else {  
      episodesList = item.contents;
    }
  }catch(error) {
    console.error(error);
  } finally {
    return episodesList;
  }
};