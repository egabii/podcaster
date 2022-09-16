import { useQuery } from 'react-query';
import useQueryStorage from './useQueryStorage';
import fetchEpisodes from 'providers/episodes/fetchEpisodes';
import { IEpisodesList } from 'providers/episodes/episodes.type';
import { useEffect } from 'react';

interface IEpisodeQuery {
	isLoading: boolean;
	data: IEpisodesList;
}

export default function useEpisodes(podcastId: string): IEpisodeQuery {
	const { storageData, setPreference } = useQueryStorage(
		`podcast/${podcastId}/episodes`
	);

	const {
		isLoading,
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
		data: storageData.contents as IEpisodesList,
	};
}
