import { useEffect, useState } from 'react';
import { Box, Image, Stack, Text, StackDivider } from '@chakra-ui/react'
import { useParams, Link } from 'react-router-dom'
import parser from 'html-react-parser';
import { IPodcastItem } from '../providers/podcasts/podcasts.type'
import { IEpisode } from '../providers/episodes/episodes.type'
import useEpisodes from '../hooks/useEpisodes'
import usePodcasts from '../hooks/usePodcasts'

export default function Episode() {
  let { podcastId, episodeId } = useParams();
  const { isLoading: isLoadingPodcasts, data: podcastList } = usePodcasts();
  const { isLoading: isLoadingEpisodes, data: episodesList } = useEpisodes(podcastId);
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<IPodcastItem | null>( null);

  useEffect(() => {
    if (episodesList) {
      setSelectedEpisode(episodesList.find(episode => episode.guid === episodeId))
    }
    if (podcastList) {
      setSelectedPodcast(podcastList.find(podcast => podcast.id === +podcastId));
    }
  }, [episodesList, podcastList]);


  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={8} marginTop='1rem'>
      <Box
        as='aside'
        w={{sm:'100%', md:'30%'}} 
        border='1px'
        borderRadius='base'
        borderColor='gray.200'
        p={{ sm: '1.25rem', md: '2rem' }}
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
        w={{sm:'100%', md:'70%'}} 
        border='1px'
        borderColor='gray.200'
        borderRadius='base'
        p={{ base: '1.25rem', md: '2rem'}}
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