import {
	IPodcastList,
	IPodcastIDResponse,
	IPodcastFeedResponse,
	IPodcastEntryResponse,
	IPodcastImageResponse,
} from 'features/podcasts/podcasts.type';

export const transformPodcastResponse = (
	podcastResponse: IPodcastFeedResponse
): IPodcastList => {
	return podcastResponse?.feed?.entry.map((item: IPodcastEntryResponse) => ({
		name: (item['im:name'] as { label: any }).label,
		images: (item['im:image'] as IPodcastImageResponse[]).map(
			(img: IPodcastImageResponse) => ({
				url: img.label,
				height: parseInt(img.attributes.height),
			})
		),
		description: item.summary.label,
		author: (item['im:artist'] as { label: any }).label,
		id: parseInt(
			(item.id as unknown as IPodcastIDResponse).attributes['im:id']
		),
	}));
};
