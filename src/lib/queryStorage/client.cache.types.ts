import dayjs from 'dayjs';

interface IQueryID {
	id: string;
}

export interface IClientCacheItem {
	lastFetchDate: string; // it should 24hours
	contents: [];
}

export interface IUseQueryStorage {
	storageData: IClientCacheItem;
	setPreference: <Type>(newPref: Type[] | Type) => void;
}

export type IQueryKey = [string[], IQueryID];

export const defaultEmptyItemStringify = JSON.stringify({
	lastFetchDate: dayjs(),
	contents: [],
});
