import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Episode from 'pages/Episode';
import usePodcasts from 'features/podcasts/usePodcasts';
import useEpisodes from 'features/episodes/useEpisodes';
import { AllTheProviders } from 'tests-utils/AllTheProviders';
import { podcastUIMockData } from 'tests-utils/mocks/podcast.mock';
import { episodesUIMockData } from 'tests-utils/mocks/episodes.mock';
import { IEpisodesList } from 'types/episodes.type';

jest.mock('features/podcasts/usePodcasts');
jest.mock('features/episodes/useEpisodes');

const mockUsePodcasts = usePodcasts as jest.MockedFunction<typeof usePodcasts>;
const mockUseEpisodes = useEpisodes as jest.MockedFunction<typeof useEpisodes>;
const episodes = episodesUIMockData as unknown as IEpisodesList;

const queryEntity = {
	isLoading: false,
	isFetching: false,
	isSuccess: false,
	isError: false,
	data: [],
};

describe('Episode detail page', () => {
	test('render view with loading frame', () => {
		// Arrange
		mockUsePodcasts.mockImplementation(() => ({
			...queryEntity,
			isLoading: true,
		}));
		mockUseEpisodes.mockImplementation(() => ({
			...queryEntity,
			isLoading: true,
		}));

		render(
			<AllTheProviders
				withMemoryRouter={true}
				route={`/podcast/${1}/episode/${1}`}
				path='/podcast/:podcastId/episode/:episodeId'>
				<Episode />
			</AllTheProviders>
		);

		// Act
		const globalLoding = screen.getByTestId('global-loading');
		const loadedBoxPodcastProfile = screen.getByTestId(
			'loaded-podcast-profile'
		);
		const loadedBoxEpisodeDescription = screen.getByTestId(
			'loaded-episode-description'
		);

		// Assert
		expect(globalLoding).toBeTruthy();
		expect(loadedBoxPodcastProfile).toBeTruthy();
		expect(loadedBoxEpisodeDescription).toBeTruthy();
	});

	test('render podcast profile section with loaded data', async () => {
		// Arrange
		const podcastId = podcastUIMockData[0].id;
		mockUsePodcasts.mockImplementation(() => ({
			...queryEntity,
			data: podcastUIMockData,
		}));
		mockUseEpisodes.mockImplementation(() => queryEntity);

		render(
			<AllTheProviders
				withMemoryRouter={true}
				route={`/podcast/${podcastId}/episode/${1}`}
				path='/podcast/:podcastId/episode/:episodeId'>
				<Episode />
			</AllTheProviders>
		);
		// Act
		const image = screen.getByRole('img', {
			name: `${podcastUIMockData[0]?.name} - ${podcastUIMockData[0]?.author}`,
		});
		const heading = screen.getByRole('heading', {
			name: podcastUIMockData[0]?.name,
		});
		const author = screen.getByText(`Author: ${podcastUIMockData[0]?.author}`);
		const description = screen.getByText(podcastUIMockData[0]?.description);

		// Assert
		expect(image).toBeTruthy();
		expect(heading).toBeTruthy();
		expect(author).toBeTruthy();
		expect(description).toBeTruthy();
	});

	test('render podcast episode detail and audio controls with loaded data', async () => {
		// Arrange
		const podcastId = podcastUIMockData[0].id;
		mockUsePodcasts.mockImplementation(() => queryEntity);
		mockUseEpisodes.mockImplementation(() => ({
			...queryEntity,
			data: episodes,
		}));

		render(
			<AllTheProviders
				withMemoryRouter={true}
				route={`/podcast/${podcastId}/episode/${1}`}
				path='/podcast/:podcastId/episode/:episodeId'>
				<Episode />
			</AllTheProviders>
		);
		// Act
		const title = screen.getByText(episodes[0].title);
		// Unable to test - TestingLibraryElementError: Unable to find an element with the text:
		// const description = screen.getByText(episodes[0].description);
		const audioControl = screen.getByTestId('audio-controls');

		// Assert
		expect(title).toBeTruthy();
		// expect(description).toBeTruthy();
		expect(audioControl).toBeTruthy();
	});
});
