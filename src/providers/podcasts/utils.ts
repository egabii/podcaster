
import { IPodcastList } from './podcasts.type';

export const destructringPodcastResponse = (podcasts: any ): IPodcastList => {
  return podcasts?.feed?.entry.map(item => ({
    name: item["im:name"].label,
    images: item["im:image"].map(img => ({url:img.label, height: parseInt(img.attributes.height) })),
    description: item.summary.label,
    author: item["im:artist"].label,
    id: parseInt(item.id.attributes["im:id"])
  }));
}