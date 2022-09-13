import { Box, Flex, Text} from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box px='1rem' h='80px' bg='blue.300'>
      <Flex align='flex-end' direction='column-reverse'>
        <Text color='white'>Podcaster</Text>
      </Flex>
    </Box>
  );
}