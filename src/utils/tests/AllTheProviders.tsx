import React, { FC, ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

interface AllTheProvidersProps {
	children: React.ReactNode;
	withMemoryRouter?: boolean | undefined;
	route?: string | undefined;
	path?: string | undefined;
}

export const AllTheProviders: FC<AllTheProvidersProps> = ({
	children,
	withMemoryRouter = false,
	route = '/',
	path = '/',
}): ReactElement => {
	return (
		<ChakraProvider>
			{withMemoryRouter ? (
				<MemoryRouter initialEntries={[route]}>
					<Routes>
						<Route path={path} element={children} />
					</Routes>
				</MemoryRouter>
			) : (
				<BrowserRouter>{children}</BrowserRouter>
			)}
		</ChakraProvider>
	);
};
