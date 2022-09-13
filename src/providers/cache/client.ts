import { IClientCacheItem, defaultEmptyItemStringify } from './client.cache.types';
import { IPodcastList } from '../podcasts/podcasts.type';
import { IEpisodesList } from '../episodes/episodes.type';
import dayjs from 'dayjs';

export function getItem (keyMapper: string): IClientCacheItem  {
  return JSON.parse(localStorage.getItem(keyMapper) ?? defaultEmptyItemStringify);
}

export function saveItem(keyMapper: string, contents: IPodcastList | IEpisodesList): IClientCacheItem {
  try {
    const alreadyItem = JSON.parse(localStorage.getItem(keyMapper) ?? defaultEmptyItemStringify);
    if (alreadyItem.contents.length === 0) {
      const stringifyItem = JSON.stringify({
        lastFetchDate: dayjs(),
        contents
      });
      localStorage.setItem(keyMapper, stringifyItem);
      return JSON.parse(stringifyItem); 
    } else {
      throw new Error('key is already in used');
    }
  }catch(error) {
    console.error(error);
  }
}

export function removeItem(keyMapper: string): void {
  const alreadyItem = JSON.parse(localStorage.getItem(keyMapper) ?? defaultEmptyItemStringify);
  if (alreadyItem.contents.length > 0) {
    localStorage.removeItem(keyMapper);
  }
}