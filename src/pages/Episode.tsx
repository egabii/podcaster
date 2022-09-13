import { useEffect, useState } from 'react';
import { Box, Image, Stack, Text, StackDivider } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useParams, useLocation, Link } from 'react-router-dom'
import parser from 'html-react-parser';
import { IPodcastItem, IPodcastList } from '../providers/podcasts/podcasts.type'
import { IEpisodesList, IEpisode } from '../providers/episodes/episodes.type'
import fetchPodcasts from '../providers/podcasts/fetchPodcast'
import fetchEpisodes from '../providers/episodes/fetchEpisodes'


export default function Episode() {
  let { podcastId, episodeId } = useParams();
  const location = useLocation();
  const { isLoading: isLoadingPodcasts, data: podcastList } = useQuery<IPodcastList, Error>('podcasts', fetchPodcasts, {
    enabled: !location.state?.podcast
  });
  const { isLoading: isLoadingEpisodes, data: episodesList } = useQuery<IEpisodesList, Error>(['episodes', podcastId], () => fetchEpisodes(podcastId), {
    enabled: !location.state?.episode
  });
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(location.state?.episode ?? null);
  const [selectedPodcast, setSelectedPodcast] = useState<IPodcastItem | null>(location.state?.podcast ?? null);

  useEffect(() => {
    if (episodesList) {
      setSelectedEpisode(episodesList.find(episode => episode.guid === episodeId))
    }
    if (podcastList) {
      setSelectedPodcast(podcastList.find(podcast => podcast.id === +podcastId));
    }
  }, [episodesList, podcastList]);


  return (
    <Stack direction={['column', 'row']} spacing={8} marginTop='1rem'>
      <Box
        as='aside'
        w={['100%', '30%']}
        border='1px'
        borderRadius='base'
        borderColor='gray.200'
        p='2rem'
        bg={isLoadingPodcasts ? 'gray.100' : 'white'}
      >
        {selectedPodcast && <Link to={`/podcast/${podcastId}`}>
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
        </Link>}
      </Box>
      <Box
        as='section'
        w={['100%', '70%']}
        border='1px'
        borderColor='gray.200'
        borderRadius='base'
        p='2rem'
        bg={isLoadingEpisodes ? 'gray.100' : 'white'}
      >
        {selectedEpisode && (
          <>
            <Text fontSize='2xl' fontWeight='semibold'>{selectedEpisode.title}</Text>
            <Text fontWeight='regular' marginBottom='1rem'>{parser(selectedEpisode.description)}</Text>
            <audio controls controlsList="nodownload" style={{ width: '100%' }}>
              <source src={selectedEpisode.enclosure.url} type={selectedEpisode.enclosure.type} />
              Your browser does not support the audio element.
            </audio>
          </>
        )}
      </Box>
    </Stack>
  )
}