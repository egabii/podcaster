import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import endpoints from '../endpoints';
import { IPodcastList } from './podcasts.type';
import { saveItem, getItem, removeItem } from '../cache/client';
dayjs.extend(relativeTime)

export default async function fetchPodcasts() {
  let podcastList: IPodcastList = [];
  const endpointPodcast = endpoints.podcasts();
  try {
    const item = getItem(endpointPodcast);
    if ( item.contents.length === 0 
      || (item.contents.length > 0 && dayjs(item?.lastFetchDate).diff(dayjs(), 'd') > 1 )) {
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