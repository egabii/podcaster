import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IPodcastItem } from 'features/podcasts/podcasts.type';
import { podcastUIMockData } from 'tests-utils/mocks/podcast.mock';
import { AllTheProviders } from 'tests-utils/AllTheProviders';
import PodcastCard from 'ui/PodcastCard';

const props: IPodcastItem = podcastUIMockData[0];

describe('PodcastCard component', () => {
	test('render component', () => {
		render(
			<AllTheProviders>
				<PodcastCard {...props} />
			</AllTheProviders>
		);

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
