import { useQuery } from 'react-query';
import useQueryStorage from './useQueryStorage';
import fetchPodcasts from 'providers/podcasts/fetchPodcast';
import { IPodcastList } from 'providers/podcasts/podcasts.type';
import { useEffect } from 'react';

const QUERY_KEY = 'podcasts';
interface IPodcastsQuery {
	isLoading: boolean;
	data: IPodcastList;
}

export default function usePodcasts(): IPodcastsQuery {
	const { storageData, setPreference } = useQueryStorage(QUERY_KEY);

	const {
		data: podcastList,
		isLoading,
		...rest
	} = useQuery<IPodcastList, Error>(QUERY_KEY, fetchPodcasts, {
		enabled: storageData.contents.length === 0,
	});

	useEffect(() => {
		if (!isLoading && !(podcastList == null)) {
			setPreference(podcastList);
		}
	}, [isLoading, podcastList]);

	return {
		...rest,
		isLoading,
		data: storageData.contents as IPodcastList,
	};
}
