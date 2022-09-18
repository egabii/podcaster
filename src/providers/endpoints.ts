const VITE_ITUNES_LOOKUP = 'https://itunes.apple.com/lookup';
const VITE_ALL_ORIGINS = 'https://api.allorigins.win/raw';
const VITE_ITUNES_TOPPODCASTS =
	'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const allOrigins = (url: string): string => `${VITE_ALL_ORIGINS}?url=${url}`;

export default {
	podcasts: () => VITE_ITUNES_TOPPODCASTS,
	episodes: (podcastId: string) =>
		`${allOrigins(VITE_ITUNES_LOOKUP)}?id=${podcastId}`,
	allOrigins,
};
