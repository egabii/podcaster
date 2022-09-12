interface IClientCacheItem {
  lastFetchDate: string, // it should 24hours 
  contents: []
}
const defaultEmptyItem = JSON.stringify({
  lastFetchDate: '',
  contents: []
});

export function getItem (keyMapper: string): IClientCacheItem  {
  return JSON.parse(localStorage.getItem(keyMapper) ?? defaultEmptyItem);
}

export function saveItem(keyMapper: string, contents: unknown): IClientCacheItem {
  try {
    const alreadyItem = JSON.parse(localStorage.getItem(keyMapper) ?? defaultEmptyItem);
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