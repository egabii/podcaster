import { useQuery } from 'react-query';
import { useQueryStorage } from 'lib/queryStorage';
import fetchEpisodes from 'features/episodes/fetchEpisodes';
import { IQueryHookBooleans } from 'types/queries.hook.type';
import { IEpisodesList } from 'types/episodes.type';
import { useEffect } from 'react';

interface IEpisodeQuery extends IQueryHookBooleans {
	data: IEpisodesList;
}

export default function useEpisodes(podcastId: string): IEpisodeQuery {
	const { storageData, setPreference } = useQueryStorage(
		`podcast/${podcastId}/episodes`
	);

	const {
		isLoading,
		isFetching,
		isSuccess,
		isError,
		data: episodesList,
		...rest
	} = useQuery<IEpisodesList, Error>(
		['episodes', podcastId],
		async () => await fetchEpisodes(podcastId),
		{
			enabled: storageData.contents.length === 0,
		}
	);

	useEffect(() => {
		if (!isLoading && !(episodesList == null)) {
			setPreference(episodesList);
		}
	}, [isLoading, episodesList]);

	return {
		...rest,
		isLoading,
		isFetching,
		isSuccess,
		isError,
		data: storageData.contents as IEpisodesList,
	};
}
