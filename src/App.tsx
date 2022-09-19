import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Podcast from 'pages/Podcast';
import Episode from 'pages/Episode';
import ContainerLayout from 'components/ContainerLayout';
const routes: { [x: string]: JSX.Element } = {
	'/': <Home />,
	'/podcast/:podcastId': <Podcast />,
	'/podcast/:podcastId/episode/:episodeId': <Episode />,
};


function AppRoutes() :JSX.Element {
	return (
		<Routes>
			{Object.entries(routes).map(([path, element]) => (
				<Route key={path} {...{ path, element }} />
			))}
		</Routes>
	)
} 

function App(): JSX.Element {
	return (
		<BrowserRouter>
			<ContainerLayout>
				<AppRoutes />
			</ContainerLayout>
		</BrowserRouter>
	);
}

export default App;
