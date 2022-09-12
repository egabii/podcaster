export interface IClientCacheItem {
  lastFetchDate: string, // it should 24hours 
  contents: []
}

export const defaultEmptyItemStringify = JSON.stringify({
  lastFetchDate: '',
  contents: []
});