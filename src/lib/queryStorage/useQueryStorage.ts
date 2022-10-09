import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import { getItem, saveItem } from 'lib/queryStorage/localStorage.client';
import { IClientCacheItem, IUseQueryStorage, IQueryKey } from 'lib/queryStorage/client.cache.types';

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
		<Type>(newPref: Type[]) => {
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
