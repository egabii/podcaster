import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Podcast from 'pages/Podcast';
import Episode from 'pages/Episode';
const routes: { [x: string]: JSX.Element } = {
	'/': <Home />,
	'/podcast/:podcastId': <Podcast />,
	'/podcast/:podcastId/episode/:episodeId': <Episode />,
};

function App(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				{Object.entries(routes).map(([path, element]) => (
					<Route key={path} {...{ path, element }} />
				))}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
