import { Box, Image,  } from "@chakra-ui/react";
import { IPodcastItem } from "../providers/podcasts/podcasts.type";

export default function PodcastCard(props:IPodcastItem) {
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image 
        src={props.images[1].url} 
        alt={`${props.name } - ${props.author}`}
        objectFit='cover'
        boxSize={'80px'}
        borderRadius='full'
      />

      <Box p='6'>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {props.name}
        </Box>

        <Box>
          {props.author}
        </Box>
      </Box>
    </Box>
  )
}