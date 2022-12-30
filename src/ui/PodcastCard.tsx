import { Box, Image, Stack, Text, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IPodcastItem } from 'types/podcasts.type';

export default function PodcastCard(props: IPodcastItem): JSX.Element {
	return (
		<Box
			p={4}
			display={{ md: 'flex' }}
			maxWidth='24rem'
			margin={2}
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			data-testid='test-card'>
			<Link
				to={`/podcast/${props.id}`}
				state={{ podcast: { ...props } }}
				style={{ margin: '0 auto' }}>
				<Image
					src={props.images[2].url}
					alt={`${props.name} - ${props.author}`}
					margin='auto'
					objectFit='cover'
					border='1px'
					borderRadius='full'
				/>
				<Stack
					align={{ base: 'center', md: 'center' }}
					textAlign={{ base: 'center', md: 'center' }}
					mt={{ base: 4, md: 0 }}>
					<Tooltip label={props.name}>
						<Text as='h4' noOfLines={1}>
							{props.name}
						</Text>
					</Tooltip>
					<Text fontWeight='semibold'>Author: {props.author}</Text>
				</Stack>
			</Link>
		</Box>
	);
}
