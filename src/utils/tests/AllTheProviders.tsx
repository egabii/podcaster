import React, { FC, ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient, setLogger } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

// test setup for react-query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			cacheTime: Infinity,
		},
	},
});

setLogger({
	log: console.log,
	warn: console.warn,
	error: () => {},
});

export const AllTheProviders: FC<{ children: React.ReactNode }> = ({
	children,
}): ReactElement => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<BrowserRouter>{children}</BrowserRouter>
			</ChakraProvider>
		</QueryClientProvider>
	);
};
