import axios from 'axios';
import endpoints from '../endpoints';
import { IPodcastList } from './podcasts.type';
import { saveItem, getItem } from '../cache/client';

export default async function fetchPodcasts() {
  let podcastList: IPodcastList = [];
  const endpointPodcast = endpoints.podcasts();
  try {
  /* TO-DO: compare date then refetch if date is more than 1 day after last fetching */
    const item = getItem(endpointPodcast);
    if ( item.contents.length === 0 ) {
      const response = await axios.get(endpointPodcast);
      saveItem(endpointPodcast, response.data.results);
      podcastList = response.data.results;
    } else {
      podcastList = item.contents;
    }

  }catch(error) {
    console.error(error);
  } finally {
    return podcastList;
  }

}