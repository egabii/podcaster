import axios from 'axios';
import endpoints from '../endpoints';
import { IPodcastList } from './podcasts.type';

export default async function fetchPodcasts() {
  let podcastList: IPodcastList = [];
  const endpointPodcast = endpoints.podcasts();
  try {
    const response = await axios.get(endpointPodcast);
    podcastList = response.data.results;

  }catch(error) {
    console.error(error);
  } finally {
    return podcastList;
  }

}