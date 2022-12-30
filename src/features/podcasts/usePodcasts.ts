import { useQuery } from 'react-query';
import { useQueryStorage } from 'lib/queryStorage';
import fetchPodcasts from 'features/podcasts/fetchPodcast';
import { IPodcastList } from 'types/podcasts.type';
import { IQueryHookBooleans } from 'types/queries.hook.type';
import { useEffect } from 'react';

const QUERY_KEY = 'podcasts';
interface IPodcastsQuery extends IQueryHookBooleans {
	data: IPodcastList;
}

export default function usePodcasts(): IPodcastsQuery {
	const { storageData, setPreference } = useQueryStorage(QUERY_KEY);

	const {
		data: podcastList,
		isLoading,
		isFetching,
		isSuccess,
		isError,
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
		isFetching,
		isSuccess,
		isError,
		data: storageData.contents as IPodcastList,
	};
}
