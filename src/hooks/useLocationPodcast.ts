import { useLocation } from 'react-router-dom';
import { IPodcastItem } from '../providers/podcasts/podcasts.type'
import { IEpisode } from '../providers/episodes/episodes.type'


type IStateLocation = {
  podcast: IPodcastItem,
  episode: IEpisode
};

export default function useLocationPodcast() {

  const location = useLocation();
  const statePodcastLocation = location.state as IStateLocation;

  return {
    ...location,
    state: statePodcastLocation
  }
}