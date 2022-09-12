import fetch from 'node-fetch';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

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
  season: number 
}

const getDuration = (duration) => `${duration[0]}${duration[1]}:${duration[2]}${duration[3]}`
export default async function handler(request, response) {
  try {
    const parser = new XMLParser({ ignoreAttributes: false });
    const podcastResponse = await axios.get(`https://itunes.apple.com/lookup?id=${request.query.podcast}`);
    const podcastData = podcastResponse.data;
    const feedUrlResponse = await axios.get(podcastData.results[0].feedUrl);
    let feedXMLData =  parser.parse(feedUrlResponse.data);
    const episodes: IEpisode[] = feedXMLData.rss.channel.item.map(episode => {
      return {
        guid: episode.guid['#text'],
        title: episode.title,
        description: episode.description,
        enclosure: {
          url: episode.enclosure['@_url'],
          length: episode.enclosure['@_length'],
          type: episode.enclosure['@_type']
        },
        duration: episode['itunes:duration'], // no tengo idea!
        image: episode['itunes:image']['@_href'],
        episodeNumber: episode['itunes:episode'],
        season: episode['itunes:season'] 
      } 
    });
    console.log(episodes);
    return response.status(200).json({results: episodes});

  }catch(error) {
    console.error(error);
    return response.status(404);
  }

}