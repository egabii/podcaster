import { IClientCacheItem, defaultEmptyItemStringify } from './client.cache.types';

export function getItem (keyMapper: string): IClientCacheItem  {
  return JSON.parse(localStorage.getItem(keyMapper) ?? defaultEmptyItemStringify);
}

export function saveItem(keyMapper: string, contents: unknown): IClientCacheItem {
  try {
    const alreadyItem = JSON.parse(localStorage.getItem(keyMapper) ?? defaultEmptyItemStringify);
    if (alreadyItem.contents.length === 0) {
      const date = new Date();
      const stringifyItem = JSON.stringify({
        lastFetchDate: new Intl.DateTimeFormat('en-US').format(date),
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