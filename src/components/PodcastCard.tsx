import { Box, Image, Stack, Text, Tooltip } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { IPodcastItem } from "../providers/podcasts/podcasts.type";

export default function PodcastCard(props: IPodcastItem) {
  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="24rem"
      margin={2}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
    >
      <Link to={`/podcast/${props.id}`}>
        <Image
          src={props.images[2].url}
          alt={`${props.name} - ${props.author}`}
          margin='auto'
          objectFit='cover'
          borderRadius='full'
        />
        <Stack
          align={{ md: "center" }}
          textAlign={{ md: "center" }}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
        >
          <Tooltip label={props.name}>
            <Text as='h4' noOfLines={1}>
              {props.name}
            </Text>
          </Tooltip>
          <Text fontWeight='semibold'>
            Author: {props.author}
          </Text>
        </Stack>
      </Link>
    </Box>
  )
}