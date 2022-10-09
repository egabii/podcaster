interface IImage {
	url: string;
	height: number;
}

export interface IPodcastItem {
	name: string;
	author: string;
	images: IImage[];
	description: string;
	id: number;
}

export type IPodcastList = IPodcastItem[];

export interface IPodcastImageResponse {
	label: string;
	attributes: {
		height: string;
	};
}

export interface IPodcastIDResponse {
	attributes: { [x: string]: string };
}

export interface IPodcastEntryResponse {
	[x: string]: { label: any } | IPodcastImageResponse[];
	summary: { label: any };
}

export interface IPodcastFeedResponse {
	feed: {
		entry: IPodcastEntryResponse[];
	};
}
