import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { Box, Image, Stack, Text, StackDivider } from '@chakra-ui/react'
import { useParams, Link } from 'react-router-dom'
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../components/DataTable";
import { IPodcastItem } from '../providers/podcasts/podcasts.type'
import { IEpisode } from '../providers/episodes/episodes.type'
import useEpisodes from '../hooks/useEpisodes'
import usePodcasts from '../hooks/usePodcasts'

export default function Podcast() {
  let { podcastId } = useParams();
  const { isLoading: isLoadingPodcasts, data: podcastList } = usePodcasts();
  const { isLoading: isLoadingEpisodes, data: episodesList } = useEpisodes(podcastId);
  const [selectedPodcast, setSelectedPodcast] = useState<IPodcastItem | null>(null);
  const columnHelper = createColumnHelper<IEpisode>();

  const columns = [
    columnHelper.accessor('title', {
      cell: (info) => (
        <Link
          to={`/podcast/${podcastId}/episode/${info.row.original.guid}`}
          state={{ podcast: selectedPodcast, episode: info.row.original }}
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

  return (
    <Stack direction={{ sm: 'column', md: 'row' }} spacing={8} marginTop='1rem'>
      <Box
        as='aside'
        w={{ sm: '100%', md: '30%' }}
        border='1px'
        borderRadius='base'
        borderColor='gray.200'
        p='2rem'
        bg={isLoadingPodcasts ? 'gray.100' : 'white'}
      >
        {
          selectedPodcast !== null && (
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
          )
        }

      </Box>
      <Box
        as='section'
        w={{ sm: '100%', md: '70%' }}
        borderColor='gray.200'
        borderRadius='base'
        pl={{ md: '2rem' }}
        pr={{ md: '2rem' }}
      >
        <Box
          border='1px'
          borderColor='gray.200'
          borderRadius='base'
          marginBottom='1rem'
          p='1rem'
          bg={isLoadingEpisodes ? 'gray.200' : 'white'}
        >
          {episodesList?.length > 0 && <Text fontSize='3xl' fontWeight='semibold'>Episodes: {episodesList.length}</Text>}
        </Box>

        <Box
          border='1px'
          borderColor='gray.200'
          borderRadius='base'
          p='1rem'
          bg={isLoadingEpisodes ? 'gray.200' : 'white'}
        >
          {episodesList?.length > 0 && <DataTable columns={columns} data={episodesList} />}
        </Box>
      </Box>
    </Stack>
  );
}