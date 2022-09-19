import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Podcast from 'pages/Podcast';
import usePodcasts from 'hooks/usePodcasts';
import useEpisodes from 'hooks/useEpisodes';
import { AllTheProviders } from 'utils/tests/AllTheProviders';
import { podcastUIMockData } from 'utils/tests/mocks/podcast.mock'
import { episodesUIMockData } from 'utils/tests/mocks/episodes.mock';
import { IEpisodesList } from 'providers/episodes/episodes.type';
  
jest.mock('hooks/usePodcasts');
jest.mock('hooks/useEpisodes');

const mockUsePodcasts = usePodcasts as jest.MockedFunction<typeof usePodcasts>
const mockUseEpisodes = useEpisodes as jest.MockedFunction<typeof useEpisodes>
const episodes = (episodesUIMockData as unknown) as IEpisodesList;

describe('Podcast detail page', () => {
	test('render view with loading frame', () => {
		// Arrange
    mockUsePodcasts.mockImplementation(() => ({isLoading: true, data: []}));
		mockUseEpisodes.mockImplementation(() => ({isLoading: true, data: []}));

		render(
			<AllTheProviders withMemoryRouter={true} route={`/podcast/${1}`} path='/podcast/:podcastId'>
				<Podcast />
			</AllTheProviders>
		);

		// Act
    const loadedBoxPodcastProfile = screen.getByTestId('loaded-podcast-profile');
		const loadedBoxEpisodesNumber = screen.getByTestId('loaded-episode-number');
    const loadedBoxEpisodesTable = screen.getByTestId('loaded-episode-table');

		// Assert
		expect(loadedBoxPodcastProfile).toBeInTheDocument();
    expect(loadedBoxEpisodesNumber).toBeInTheDocument();
    expect(loadedBoxEpisodesTable).toBeInTheDocument();

	});

  test('render podcast profile section with loaded data', async () => {
		// Arrange
    const podcastId = podcastUIMockData[0].id;
    mockUsePodcasts.mockImplementation(() => ({isLoading: true, data: podcastUIMockData}));
		mockUseEpisodes.mockImplementation(() => ({isLoading: false, data: []}));

		render(
			<AllTheProviders withMemoryRouter={true} route={`/podcast/${podcastId}`} path='/podcast/:podcastId'>
				<Podcast />
			</AllTheProviders>
		);
		// Act
    const image = screen.getByRole('img', {
      name: `${podcastUIMockData[0]?.name} - ${podcastUIMockData[0]?.author}`
    });
    const heading = screen.getByRole('heading', {
      name: podcastUIMockData[0]?.name
    });
    const author = screen.getByText(`Author: ${podcastUIMockData[0]?.author}`);
    const description = screen.getByText(podcastUIMockData[0]?.description);

    // Assert
    expect(image).toBeTruthy();
    expect(heading).toBeTruthy();
    expect(author).toBeTruthy();
    expect(description).toBeTruthy();

	});

  test('render podcast episodes table with loaded data', async () => {
		// Arrange
    const podcastId = podcastUIMockData[0].id;
    mockUsePodcasts.mockImplementation(() => ({isLoading: true, data: podcastUIMockData}));
		mockUseEpisodes.mockImplementation(() => ({isLoading: false, data: episodes}));

		render(
			<AllTheProviders withMemoryRouter={true} route={`/podcast/${podcastId}`} path='/podcast/:podcastId'>
				<Podcast />
			</AllTheProviders>
		);
		// Act
    const episodesLength = screen.getByText(`Episodes: ${episodes.length}`);
    const table = screen.getByRole('table');
    const rows = screen.getAllByRole('row');

    // Assert
    expect(episodesLength).toBeTruthy();
    expect(table).toBeTruthy();
    expect(rows.length - 1).toBe(episodes.length); // length -1 due to we count thead > tr as well.

	});

});
