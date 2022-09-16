import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import { getItem, saveItem } from 'providers/cache/client';
import { IClientCacheItem } from 'providers/cache/client.cache.types';
import { IPodcastList } from 'providers/podcasts/podcasts.type';
import { IEpisodesList } from 'providers/episodes/episodes.type';

type IPreference = IPodcastList | IEpisodesList;
interface IUseQueryStorage {
	storageData: IClientCacheItem;
	setPreference: (newPref: IPreference) => void;
}

interface IQueryID {
	id: string;
}
type IQueryKey = [string[], IQueryID];

export default function useQueryStorage(id: string): IUseQueryStorage {
	const queryKey = makePrefQueryKey(id);
	const queryClient = useQueryClient();
	const { data } = useQuery<IClientCacheItem>(
		queryKey,
		() => {
			return getItem(id);
		},
		{
			initialData: () => {
				const item = getItem(id);

				if (dayjs(item?.lastFetchDate).diff(dayjs(), 'd') > 1) {
					return {
						...item,
						contents: [],
					};
				}

				return item;
			},
		}
	);

	const setPreference = useCallback(
		(newPref: any) => {
			saveItem(id, newPref);
			queryClient.invalidateQueries(queryKey).catch(console.log);
		},
		[id, queryKey]
	);

	return {
		storageData: data as IClientCacheItem,
		setPreference,
	};
}

function makePrefQueryKey(id: string): IQueryKey {
	return [['preferences'], { id }];
}
