import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Badge, Box, Flex, Input, SimpleGrid, Text } from '@chakra-ui/react'
import { IPodcastList } from '../providers/podcasts/podcasts.type'
import fetchPodcasts from '../providers/podcasts/fetchPodcast'
import PodcastCard from '../components/PodcastCard'

export default function Home() {
  const { isFetching, data:podcastList } = useQuery<IPodcastList, Error>('podcasts', fetchPodcasts);
  const [renderList, setRenderList] = useState<IPodcastList>([]);
  const [searchItem, setSearchItems] = useState<string>('');

  useEffect(() => {
    if (podcastList) {
      setRenderList(podcastList);
    }
  }, [podcastList]);

   useEffect(() => {
    if (searchItem !== '') {
      setRenderList(podcastList
        .filter(podcast => podcast.name.toLowerCase().includes(searchItem.toLowerCase()) 
        || podcast.author.toLowerCase().includes(searchItem.toLowerCase())));
    } else {
      setRenderList(podcastList ?? []);
    }
  }, [searchItem]);

  const onChangeSearch = (e) => {
   setSearchItems(e.target.value)
  };

  if (isFetching) return <h1>Loading ...</h1>

  return (
    <>
      <Box as='section' p='4'>
        <Flex justify='flex-end' align='center'>
          <Badge borderRadius='full' px='2' textAlign='center' colorScheme='teal' w='40px'>
            {renderList.length}
          </Badge>
          <Input 
            placeholder='Filter podcasts' 
            size='sm' w='300px' 
            onChange={onChangeSearch}
            margin='2'
          />
        </Flex>
      </Box>
      <SimpleGrid columns={{ sm: 2, md: 4}} spacing={4}>
        {renderList.map(podcast => <Box key={podcast.id} height='80px'>
          <PodcastCard {...podcast} />
        </Box>)}
      </SimpleGrid>
    </>

  )
}