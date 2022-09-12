import { useEffect, useState } from 'react'; 
import { Box, Image, Stack, Text, StackDivider } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { IPodcastList } from '../providers/podcasts/podcasts.type'
import { IEpisodesList } from '../providers/episodes/episodes.type'
import fetchPodcasts from '../providers/podcasts/fetchPodcast'
import fetchEpisodes from '../providers/episodes/fetchEpisodes'

export default function Podcast() {
  let { podcastId } = useParams();
  const { data:podcastList } = useQuery<IPodcastList, Error>('podcasts', fetchPodcasts);
  const { isFetching: isFetchingEpisodes, data: episodesList } = useQuery<IEpisodesList, Error>(['episodes', podcastId], () => fetchEpisodes(podcastId));
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  useEffect(() => {
    if (podcastList) {
      setSelectedPodcast(podcastList.find(podcast => podcast.id === +podcastId));
    }
  }, [podcastList]);

  if (selectedPodcast === null) return <h1>Loading...</h1>


  return (
    <Stack direction={['column', 'row']} spacing={8} marginTop='1rem'>
      <Box as='aside' w={['100%', '30%']} border='1px' borderRadius='base' borderColor='gray.200' p='2rem'>
        <Stack
          align={{ md: "center" }}
          textAlign={{ md: "left" }}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          divider={<StackDivider borderColor='gray.200' />}
        >
          <Box>
            <Image
              src={selectedPodcast.images[2].url}
              alt={`${selectedPodcast.name} - ${selectedPodcast.author}`}
              margin='auto'
              objectFit='cover'
              borderRadius='base'
            />
          </Box>
          <Box>
            <Text as='h4'>
              {selectedPodcast.name}
            </Text>
            <Text fontWeight='semibold'>
              Author: {selectedPodcast.author}
            </Text>
          </Box>
          <Box>
            <Text as='h6' fontWeight='semibold'>
              Description
            </Text>
            <Text fontWeight='normal' as='i'>
              {selectedPodcast.description}
            </Text>
          </Box>
        </Stack>
      </Box>
      <Box 
        as='section'  
        w={['100%', '70%']} 
        border='1px' 
        borderColor='gray.200' 
        borderRadius='base'
        p='2rem'
      >
        { isFetchingEpisodes && <h1>Loading....</h1> }
        { episodesList && <ul>
          {episodesList.map(episode => <li key={episode.guid}>{episode.title}</li>)}  
        </ul>}
      </Box>
    </Stack>
  );
}