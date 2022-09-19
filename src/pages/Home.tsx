import { SetStateAction, useEffect, useState } from 'react';
import { Badge, Box, Flex, Input, SimpleGrid } from '@chakra-ui/react';
import ContainerLayout from 'components/ContainerLayout';
import { IPodcastList } from 'providers/podcasts/podcasts.type';
import PodcastCard from 'components/PodcastCard';
import usePodcasts from 'hooks/usePodcasts';

export default function Home(): JSX.Element {
	const { isLoading, data: podcastList } = usePodcasts();
	const [renderList, setRenderList] = useState<IPodcastList>([]);
	const [searchItem, setSearchItems] = useState<string>('');

	useEffect(() => {
		if (podcastList?.length > 0) {
			setRenderList(podcastList);
		}
	}, [podcastList]);

	useEffect(() => {
		if (searchItem !== '') {
			setRenderList(
				podcastList.filter(
					podcast =>
						podcast.name.toLowerCase().includes(searchItem.toLowerCase()) ||
						podcast.author.toLowerCase().includes(searchItem.toLowerCase())
				)
			);
		} else {
			setRenderList(podcastList ?? []);
		}
	}, [searchItem]);

	const onChangeSearch = (e: {
		target: { value: SetStateAction<string> };
	}): void => {
		setSearchItems(e.target.value);
	};

	return (
		<ContainerLayout spinnerHeader={isLoading}>
			<>
				<Box as='section' p='4'>
					<Flex justify='flex-end' align='center'>
						<Badge
							borderRadius='full'
							px='2'
							textAlign='center'
							colorScheme='teal'
							w='50px'
							fontSize='1rem'>
							{renderList.length}
						</Badge>
						<Input
							placeholder='Filter podcasts'
							aria-label='search-podcast'
							size='sm'
							w='300px'
							onChange={onChangeSearch}
							margin='2'
						/>
					</Flex>
				</Box>
				<SimpleGrid columns={{ sm: 2, md: 4 }} spacing={1}>
					{renderList.map(podcast => (
						<PodcastCard key={podcast.id} {...podcast} />
					))}
				</SimpleGrid>
			</>
		</ContainerLayout>
	);
}
