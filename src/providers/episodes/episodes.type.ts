export interface IEnclosure {
	url: string;
	type: string;
	length: number;
}

export interface IEpisode {
	id: number;
	guid: string;
	title: string;
	description: string;
	enclosure: IEnclosure;
	duration: string;
	image: string;
	episodeNumber: number;
	season: number;
	publishDate: string;
}

export type IEpisodesList = IEpisode[];
