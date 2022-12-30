import axios from 'axios';
import endpoints from 'endpoints';
import { transformPodcastResponse } from './transformPodcastResponse';
import { IPodcastList } from 'types/podcasts.type';

export default async function fetchPodcasts(): Promise<IPodcastList> {
	let podcastList: IPodcastList = [];
	try {
		const response = await axios.get(endpoints.podcasts());
		podcastList = transformPodcastResponse(response.data);
	} catch (error) {
		console.error(error);
	}
	return podcastList;
}
