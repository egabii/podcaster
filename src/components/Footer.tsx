import { Box, Flex, Text } from '@chakra-ui/react';

export default function Footer(): JSX.Element {
	return (
		<Box px='1rem' h='80px' bg='blue.300'>
			<Flex align='flex-end' direction='column-reverse'>
				<Text color='white'>Podcaster</Text>
				<a
					href='https://www.flaticon.com/free-icons/podcast'
					title='podcast icons'
					style={{ display: 'none' }}>
					Podcast icons created by Smashicons - Flaticon
				</a>
			</Flex>
		</Box>
	);
}
