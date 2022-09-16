import { IPodcastList } from './providers/podcasts/podcasts.type';
import { IEpisodesList } from './providers/episodes/episodes.type';
import { XMLParser } from 'fast-xml-parser'

export const destructringPodcastResponse = (podcasts: any ): IPodcastList => {
  return podcasts?.feed?.entry.map(item => ({
    name: item["im:name"].label,
    images: item["im:image"].map(img => ({url:img.label, height: parseInt(img.attributes.height) })),
    description: item.summary.label,
    author: item["im:artist"].label,
    id: parseInt(item.id.attributes["im:id"])
  }));
}


export const destructringEpisodeResponse = (xmlResponse: string ): IEpisodesList => {
  const parser = new XMLParser({ ignoreAttributes: false });
  let feedXMLData =  parser.parse(xmlResponse);
  // due to some podcasts have a lot of episodes which makes harder to handle these 
  // I took this approach to slice the first 50 episodes only
  return feedXMLData.rss.channel.item.slice(0, 50).map(episode => {
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
}