export interface IEnclosure {
  url: string,
  type: string,
  length: number
}

export interface IEpisode {
  guid: number,
  title: string,
  description: string,
  enclosure: IEnclosure,
  duration: string,
  image: string,
  episodeNumber: number,
  season: number 
}

export type IEpisodesList = IEpisode[]; 
