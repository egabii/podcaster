import axios from 'axios';
import endpoints from '../endpoints';
import { IEpisodesList } from './episodes.type';
import { destructringEpisodeResponse } from 'utils';

export default async function fetchEpisodes(
	podcastId: string
): Promise<IEpisodesList> {
	let episodesList: IEpisodesList = [];
	try {
		const response = await axios
			.get(endpoints.episodes(podcastId))
			.then(async res => {
				return await axios.get(
					endpoints.allOrigins(res.data.results[0].feedUrl)
				);
			});
		episodesList = destructringEpisodeResponse(response.data);
	} catch (error) {
		console.error(error);
	}

	return episodesList;
}
