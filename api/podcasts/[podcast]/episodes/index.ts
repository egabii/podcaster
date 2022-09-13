import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

interface IEnclosure {
  url: string,
  type: string,
  length: number
}
interface IEpisode {
  guid: number,
  title: string,
  description: string,
  enclosure: IEnclosure,
  duration: string,
  image: string,
  episodeNumber: number,
  season: number,
  publishDate: string
}

export default async function handler(request, response) {
  try {
    const parser = new XMLParser({ ignoreAttributes: false });
    const podcastResponse = await axios.get(`https://itunes.apple.com/lookup?id=${request.query.podcast}`);
    const podcastData = podcastResponse.data;
    const feedUrlResponse = await axios.get(podcastData.results[0].feedUrl);
    let feedXMLData =  parser.parse(feedUrlResponse.data);
    // due to some podcasts have a lot of episodes which makes harder to handle these 
    // I took this approach to slice the first 50 episodes only
    const episodes: IEpisode[] = feedXMLData.rss.channel.item.slice(0, 51).map(episode => {
      return {
        guid: episode.guid['#text'],
        title: episode.title,
        description: episode['content:encoded'] ?? episode.description,
        enclosure: {
          url: episode.enclosure['@_url'],
          length: episode.enclosure['@_length'],
          type: episode.enclosure['@_type']
        },
        duration: episode['itunes:duration'], // some results have a number other a string ?
        image: episode['itunes:image'] ? episode['itunes:image']['@_href'] : '',
        episodeNumber: episode['itunes:episode'] ?? 0,
        season: episode['itunes:season'] ?? 0,
        publishDate: episode?.pubDate
      } 
    });
    return response.status(200).json({results: episodes});

  }catch(error) {
    console.error(error);
    return response.status(404);
  }

}