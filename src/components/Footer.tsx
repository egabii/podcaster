import { Box } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as='footer' borderRadius='md' bg='tomato' color='white' px={4} h={8}>
      <h1>This is the footer</h1>
    </Box>
  );
}