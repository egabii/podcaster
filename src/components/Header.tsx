import { Link } from "react-router-dom";
import { useIsFetching } from 'react-query'
import { Box, CircularProgress, Flex, Text} from '@chakra-ui/react'

export default function Header() {
  const isFetching = useIsFetching();
  return (
    <Flex align='center' justify='space-between' pl='4' pr='4' pt='4' marginBottom='1rem'>
      <Box as="nav">
        <Link to="/">
          <Text fontSize='xl' as='b' color='blue.300'>Podcaster</Text>
        </Link>
      </Box>
      <Box>
        {isFetching >= 1 && <CircularProgress isIndeterminate color='green.300' size='35px' />}
      </Box>
    </Flex>
  );
}