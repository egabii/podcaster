
const allOrigins = (url: string) => `${import.meta.env.VITE_ALL_ORIGINS}?url=${url}`;

export default {
  podcasts:() =>  import.meta.env.VITE_ITUNES_TOPPODCASTS,
  episodes: (podcastId) => `${allOrigins(import.meta.env.VITE_ITUNES_LOOKUP)}?id=${podcastId}`,
  allOrigins
}