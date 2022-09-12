
import fetch from 'node-fetch';
interface IImage {
 url: string,
 height: number
}
export interface IPodcastItem {
  name: string,
  author: string,
  images: IImage[],
  description: string,
  id: number
};
type IPodcastList = Array<IPodcastItem>;
export default async function handler(request, response) {
  try {
    const podcastResponse = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
    if (podcastResponse.ok) {
      const data = await podcastResponse.json();
      const podcasts: IPodcastList = data.feed.entry.map(item => {
        return {
          name: item["im:name"].label,
          images: item["im:image"].map(img => ({url:img.label, height: parseInt(img.attributes.height) })),
          description: item.summary.label,
          author: item["im:artist"].label,
          id: parseInt(item.id.attributes["im:id"])
        }
      });

      return response.status(200).json({results: podcasts});
    } else {
      throw new Error('Error from provider');
    }

  }catch(error) {
    console.error(error);
    return response.status(404);
  }

}