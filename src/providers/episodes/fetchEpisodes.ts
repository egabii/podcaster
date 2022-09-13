import axios from 'axios';
import dayjs from 'dayjs';
import endpoints from '../endpoints';
import { IEpisodesList } from './episodes.type';
import { saveItem, getItem, removeItem } from '../cache/client';
import { IClientCacheItem } from '../cache/client.cache.types';

export default async function fetchEpisodes(podcastId) {
  let episodesList: IEpisodesList = [];
  const endpointEpisodes = endpoints.episodes(podcastId);
  try {
    const item = getItem(endpointEpisodes);
    if ( item.contents.length === 0 
      || (item.contents.length > 0 && dayjs(item?.lastFetchDate).diff(dayjs(), 'd') > 1 )) {
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