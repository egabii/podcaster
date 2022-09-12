import fetch from 'node-fetch';
import axios from 'axios';

/**
 * TO-DO:  
 * fetch feedURL 
 * parse xml which comes from response 
 * grab first ~50 items which we need to work with (it seems to each feed has a lot of items more than a UI can handle)
 * define interface for podcast's eposides
 * 
 *  */ 
export default async function handler(request, response) {
  try {
    console.log(request.query.podcast)
    const podcastResponse = await fetch(`https://itunes.apple.com/lookup?id=${request.query.podcast}`);
    if (podcastResponse.ok) {
      const data = await podcastResponse.json();
      console.log(data);
      const feedUrlResponse = await axios.get(data.results[0].feedUrl);
      console.log(feedUrlResponse);
    
      return response.status(200).json({results: 'hola mundo'});
    } else {
      throw new Error('Error from provider');
    }

  }catch(error) {
    console.error(error);
    return response.status(404);
  }

}