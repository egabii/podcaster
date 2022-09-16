import axios from 'axios';
import endpoints from '../endpoints';
import { destructringPodcastResponse } from './utils';
import { IPodcastList } from './podcasts.type';

export default async function fetchPodcasts(): Promise<IPodcastList> {
	let podcastList: IPodcastList = [];
	try {
		const response = await axios.get(endpoints.podcasts());
		podcastList = destructringPodcastResponse(response.data);
	} catch (error) {
		console.error(error);
	}
	return podcastList;
}
