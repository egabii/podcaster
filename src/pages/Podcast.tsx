import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { Box, Image, Stack, Text, StackDivider } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../components/DataTable";
import { IPodcastItem, IPodcastList } from '../providers/podcasts/podcasts.type'
import { IEpisodesList, IEpisode } from '../providers/episodes/episodes.type'
import fetchPodcasts from '../providers/podcasts/fetchPodcast'
import fetchEpisodes from '../providers/episodes/fetchEpisodes'
import useLocationPodcast from '../hooks/useLocationPodcast'

export default function Podcast() {
  let { podcastId } = useParams();
  const location = useLocationPodcast();
  const { data:podcastList } = useQuery<IPodcastList, Error>('podcasts', fetchPodcasts, {
    enabled: !location.state?.podcast,
  });
  const { isLoading: isLoadingEpisodes, data: episodesList } = useQuery<IEpisodesList, Error>(['episodes', podcastId], () => fetchEpisodes(podcastId));
  const [selectedPodcast, setSelectedPodcast] = useState<IPodcastItem | null>(location.state?.podcast ?? null);
  const columnHelper = createColumnHelper<IEpisode>();

  const columns = [
    columnHelper.accessor('title', {
      cell: (info) => (
      <Link 
        to={`/podcast/${podcastId}/episode/${info.row.original.guid}`} 
        state={{podcast: selectedPodcast, episode: info.row.original }}
      >
        <Text color='blue.400' _hover={{ color: "blue.200" }}>
          {info.getValue()}
        </Text>
      </Link>),
      header: 'Title'
    }),
    columnHelper.accessor('publishDate', {
      cell: (info) => dayjs(info.getValue()).format('DD/MM/YYYY'),
      header: 'Date'
    }),
    columnHelper.accessor('duration', {
      cell: (info) => info.getValue(),
      header: 'Duration'
    })
  ];

  useEffect(() => {
    if (podcastList) {
      setSelectedPodcast(podcastList.find(podcast => podcast.id === +podcastId));
    }
  }, [podcastList]);

  if (selectedPodcast === null) return <h1>Loading...</h1>


  return (
    <Stack direction={{sm:'column', md:'row'}} spacing={8} marginTop='1rem'>
      <Box as='aside' w={{sm:'100%', md:'30%'}} border='1px' borderRadius='base' borderColor='gray.200' p='2rem'>
        <Stack
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
        w={{sm:'100%', md:'70%'}}
        borderColor='gray.200' 
        borderRadius='base'
        pl='2rem'
        pr='2rem'
      >
        <Box 
          border='1px' 
          borderColor='gray.200' 
          borderRadius='base'
          marginBottom='1rem'
          p='1rem'
          bg={isLoadingEpisodes ? 'gray.200' : 'white'}
        >
          { episodesList && <Text fontSize='3xl' fontWeight='semibold'>Episodes: {episodesList.length}</Text> }
        </Box>

        <Box 
          border='1px' 
          borderColor='gray.200' 
          borderRadius='base'
          p='1rem'
          bg={isLoadingEpisodes ? 'gray.200' : 'white'}
        >
          { episodesList && <DataTable columns={columns} data={episodesList} /> }
        </Box>
      </Box>
    </Stack>
  );
}