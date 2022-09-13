import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import dayjs from 'dayjs'
import { getItem, saveItem } from '../providers/cache/client'
import { IClientCacheItem } from '../providers/cache/client.cache.types'

export default function useQueryStorage(id: string) {
  const queryKey = makePrefQueryKey(id);
  const queryClient = useQueryClient();
  const { data } = useQuery<IClientCacheItem>(queryKey, () => {
    return getItem(id);
  }, 
  {
    initialData: () => {
      const item = getItem(id);
      
      if (dayjs(item?.lastFetchDate).diff(dayjs(), 'd') > 1 ) {
        return {
          ...item,
          contents: []
        }
      }

      return item;
    }
  });

  const setPreference = useCallback((newPref: any) => {
      saveItem(id, newPref);
      queryClient.invalidateQueries((query): boolean => {
        return isEqual(query.queryKey, queryKey);
      });
    },
    [id, queryKey]
  );


  
  return {
    storageData: data as IClientCacheItem,
    setPreference
  };
}

function isEqual(currentQueryKey, queryKeyParam): boolean {
  return JSON.stringify(currentQueryKey) === JSON.stringify(queryKeyParam);
}

function makePrefQueryKey(id: string) {
  const queryKey = [["preferences"], { id }];
  return queryKey;
}