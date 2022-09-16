const allOrigins = (url: string): string =>
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	`${import.meta.env.VITE_ALL_ORIGINS}?url=${url}`;

export default {
	podcasts: () => import.meta.env.VITE_ITUNES_TOPPODCASTS,
	episodes: (podcastId: string) =>
		`${allOrigins(import.meta.env.VITE_ITUNES_LOOKUP)}?id=${podcastId}`,
	allOrigins,
};
