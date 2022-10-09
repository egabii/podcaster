import {
	IClientCacheItem,
	defaultEmptyItemStringify,
} from './client.cache.types';
import dayjs from 'dayjs';

export function getItem(keyMapper: string): IClientCacheItem {
	return JSON.parse(
		localStorage.getItem(keyMapper) ?? defaultEmptyItemStringify
	);
}

export function saveItem<Type>(keyMapper: string, contents: Type[]): void {
	try {
		const stringifyItem = JSON.stringify({
			lastFetchDate: dayjs(),
			contents,
		});
		localStorage.setItem(keyMapper, stringifyItem);
		return JSON.parse(stringifyItem);
	} catch (error) {
		console.error(error);
	}
}

export function removeItem(keyMapper: string): void {
	const alreadyItem = JSON.parse(
		localStorage.getItem(keyMapper) ?? defaultEmptyItemStringify
	);
	if (alreadyItem.contents.length > 0) {
		localStorage.removeItem(keyMapper);
	}
}
