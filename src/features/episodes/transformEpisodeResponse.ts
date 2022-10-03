import {
	IEpisodesList,
	IEpisodeItemXML,
} from 'features/episodes/episodes.type';
import { XMLParser } from 'fast-xml-parser';

export const transformEpisodeResponse = (
	xmlResponse: string
): IEpisodesList => {
	const parser = new XMLParser({ ignoreAttributes: false });
	const {
		rss: {
			channel: { item },
		},
	} = parser.parse(xmlResponse);
	// due to some podcasts have a lot of episodes which makes harder to handle these
	// I took this approach to slice the first 50 episodes only
	return (item as IEpisodeItemXML[])
		.slice(0, 50)
		.map((episode: IEpisodeItemXML, index: number) => {
			return {
				guid: episode.guid['#text'],
				title: episode.title,
				description: episode['content:encoded'] ?? episode.description,
				enclosure: {
					url: episode.enclosure['@_url'],
					length: episode.enclosure['@_length'],
					type: episode.enclosure['@_type'],
				},
				duration: episode['itunes:duration'], // some results have a number other a string ?
				episodeNumber: episode['itunes:episode'] ?? 0,
				season: episode['itunes:season'] ?? 0,
				publishDate: episode?.pubDate,
				id: index + 1,
			};
		}) as IEpisodesList;
};
