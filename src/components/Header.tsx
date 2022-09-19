import { Link } from 'react-router-dom';
import { Box, CircularProgress, Flex, Text } from '@chakra-ui/react';

interface HeaderProps {
	loading?: boolean;
}

export default function Header({ loading = false }: HeaderProps): JSX.Element {
	return (
		<Flex
			align='center'
			justify='space-between'
			pl='4'
			pr='4'
			pt='4'
			marginBottom='1rem'>
			<Box as='nav'>
				<Link to='/'>
					<Text fontSize='xl' as='b' color='blue.300'>
						Podcaster
					</Text>
				</Link>
			</Box>
			<Box>
				{loading ? (
					<CircularProgress
						isIndeterminate
						color='green.300'
						size='35px'
						data-testid='global-loading'
					/>
				) : null}
			</Box>
		</Flex>
	);
}
