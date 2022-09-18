import { /* cleanup, */ render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from 'pages/Home';
import { AllTheProviders } from 'utils/tests/AllTheProviders';
import axios from 'axios';
import { axiosResponseDataMock } from 'utils/tests/mocks/podcast.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home', () => {
	// afterEach(cleanup);

	test('render view with cards', async () => {
		// Arrange + Act
		mockedAxios.get.mockResolvedValue({ data: axiosResponseDataMock });
		render(
			<AllTheProviders>
				<Home />
			</AllTheProviders>
		);

		// Assert
		expect(screen.getByText('Loading')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText('Loading')).not.toBeInTheDocument();
			expect(
				screen.getByRole('img', {
					name: /björk: sonic symbolism - mailchimp/i,
				})
			).toBeInTheDocument();

			expect(
				screen.getByRole('heading', {
					name: /björk: sonic symbolism/i,
				})
			).toBeInTheDocument();

			expect(screen.getByText(/author: mailchimp/i)).toBeInTheDocument();
		});
	});
});
