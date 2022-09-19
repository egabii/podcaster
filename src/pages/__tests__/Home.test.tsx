import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from 'pages/Home';
import usePodcasts from 'hooks/usePodcasts';
import { AllTheProviders } from 'utils/tests/AllTheProviders';
import { podcastUIMockData } from 'utils/tests/mocks/podcast.mock'

jest.mock('hooks/usePodcasts');

const mockUsePodcasts = usePodcasts as jest.MockedFunction<typeof usePodcasts>

describe('Home Page', () => {
	test('render view with loading frame', async () => {
		// Arrange
    mockUsePodcasts.mockImplementation(() => ({isLoading: true, data: []}));
		
		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Act
		const loadingFrame = screen.getByText('Loading');

		// Assert
		expect(loadingFrame).toBeInTheDocument();

	});


	test('render view with cards', async () => {
		// Arrange
    mockUsePodcasts.mockImplementation(() => ({isLoading: false, data: podcastUIMockData}));
		
		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Act
		const cards = screen.getAllByTestId('test-card');

		// Assert
		expect(cards.length).toBe(podcastUIMockData.length);

	});

	test('search and find a podcast', async () => {
		// Arrange
    mockUsePodcasts.mockImplementation(() => ({isLoading: false, data: podcastUIMockData}));
		
		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Act
		const inputElement = screen.getByLabelText('search-podcast');
		fireEvent.change(inputElement, {target: {value: 'Song'}});
		const cards = screen.getAllByTestId('test-card');

		// Assert
		expect(cards.length).toBe(2);

	});

	test('search and not found any podcast', async () => {
		// Arrange
    mockUsePodcasts.mockImplementation(() => ({isLoading: false, data: podcastUIMockData}));
		
		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Act
		let cards = [];
		try {
			const inputElement = screen.getByLabelText('search-podcast');
			fireEvent.change(inputElement, {target: {value: 'QWEAS'}});
			cards = screen.getAllByTestId('test-card');
		}catch(err) {
			// Assert	
			expect(cards.length).toBe(0);
		}

	});


});
