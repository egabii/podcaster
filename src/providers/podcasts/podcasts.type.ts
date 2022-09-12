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


export type IPodcastList =  Array<IPodcastItem>;