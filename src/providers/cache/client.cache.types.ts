import  dayjs from 'dayjs';
export interface IClientCacheItem {
  lastFetchDate: string, // it should 24hours 
  contents: []
}

export const defaultEmptyItemStringify = JSON.stringify({
  lastFetchDate: dayjs(),
  contents: []
});