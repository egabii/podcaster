import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from 'pages/Home';
import usePodcasts from 'features/podcasts/usePodcasts';
import { AllTheProviders } from 'utils/tests-utils/AllTheProviders';
import { podcastUIMockData } from 'utils/tests-utils/mocks/podcast.mock';

jest.mock('features/podcasts/usePodcasts');

const mockUsePodcasts = usePodcasts as jest.MockedFunction<typeof usePodcasts>;
const queryEntity = {
	isLoading: false,
	isFetching: false,
	isSuccess: false,
	isError: false,
	data: [],
};

describe('Home Page', () => {
	test('render view with loading frame', async () => {
		// Arrange
		mockUsePodcasts.mockImplementation(() => ({
			...queryEntity,
			isLoading: true,
		}));

		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Act
		const globalLoding = screen.getByTestId('global-loading');
		// Assert
		expect(globalLoding).toBeTruthy();
	});

	test('render view with cards', async () => {
		// Arrange
		mockUsePodcasts.mockImplementation(() => ({
			...queryEntity,
			data: podcastUIMockData,
		}));

		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Act
		const cards = screen.getAllByTestId('test-card');
		let globalLoding;
		try {
			globalLoding = screen.getByTestId('global-loading');
		} catch (error) {
			// Assert
			expect(globalLoding).toBeFalsy();
			expect(cards.length).toBe(podcastUIMockData.length);
		}
	});

	test('search and find a podcast', async () => {
		// Arrange
		mockUsePodcasts.mockImplementation(() => ({
			...queryEntity,
			data: podcastUIMockData,
		}));

		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Act
		const inputElement = screen.getByLabelText('search-podcast');
		fireEvent.change(inputElement, { target: { value: 'Song' } });
		const cards = screen.getAllByTestId('test-card');

		// Assert
		expect(cards.length).toBe(2);
	});

	test('search and not found any podcast', async () => {
		// Arrange
		mockUsePodcasts.mockImplementation(() => ({
			...queryEntity,
			data: podcastUIMockData,
		}));

		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Act
		let cards = [];
		try {
			const inputElement = screen.getByLabelText('search-podcast');
			fireEvent.change(inputElement, { target: { value: 'QWEAS' } });
			cards = screen.getAllByTestId('test-card');
		} catch (err) {
			// Assert
			expect(cards.length).toBe(0);
		}
	});
});
