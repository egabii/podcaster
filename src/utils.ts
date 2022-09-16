import { IPodcastList } from 'providers/podcasts/podcasts.type';
import { IEpisodesList } from 'providers/episodes/episodes.type';
import { XMLParser } from 'fast-xml-parser';

interface IPodcastImageResponse {
	label: string;
	attributes: {
		height: string;
	};
}

interface IPodcastIDResponse {
	attributes: { [x: string]: string };
}

interface IPodcastEntryResponse {
	[x: string]: { label: any } | IPodcastImageResponse[];
	summary: { label: any };
}

interface IEpisodeItemXML {
	[x: string]: any;
	guid: { [x: string]: any };
	title: any;
	description: any;
	enclosure: { [x: string]: any };
	pubDate: any;
}

export const destructringPodcastResponse = (podcasts: any): IPodcastList => {
	return podcasts?.feed?.entry.map((item: IPodcastEntryResponse) => ({
		name: (item['im:name'] as { label: any }).label,
		images: (item['im:image'] as IPodcastImageResponse[]).map(img => ({
			url: img.label,
			height: parseInt(img.attributes.height),
		})),
		description: item.summary.label,
		author: (item['im:artist'] as { label: any }).label,
		id: parseInt(
			(item.id as unknown as IPodcastIDResponse).attributes['im:id']
		),
	}));
};

export const destructringEpisodeResponse = (
	xmlResponse: string
): IEpisodesList => {
	const parser = new XMLParser({ ignoreAttributes: false });
	const feedXMLData = parser.parse(xmlResponse);
	// due to some podcasts have a lot of episodes which makes harder to handle these
	// I took this approach to slice the first 50 episodes only
	return feedXMLData.rss.channel.item
		.slice(0, 50)
		.map((episode: IEpisodeItemXML) => {
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
			};
		});
};
