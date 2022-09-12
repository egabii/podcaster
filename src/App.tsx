import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'
import Home from './pages/Home'
import Podcast from './pages/Podcast'
import Episode from './pages/Episode'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const gridProps = {
    templateAreas: `
    "header"
    "main"
    "footer"`,
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '100%',
    maxW: '1920px',
    h: '200px',
    color: 'blackAlpha.700',
    fontWeight: 'bold'
  }
  return (
    <BrowserRouter>
      <Grid {...gridProps}>
        <GridItem area={'header'} as='header' borderBottom={'1px solid #eee'}>
          <Header />
        </GridItem>
        <GridItem pl='2' pr='2' area={'main'} as='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcast/:podcastId" element={<Podcast />} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} />
          </Routes>
        </GridItem>
        <GridItem pl='2' pr='2' bg='blue.300' area={'footer'} as='footer'>
          <Footer />
        </GridItem>
      </Grid>
    </BrowserRouter>
  );
}

export default App
