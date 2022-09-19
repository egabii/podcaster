import { Grid, GridItem } from '@chakra-ui/react';
import Header from 'components/Header';
import Footer from 'components/Footer';

interface ContainerLayoutProps {
	children: JSX.Element;
	spinnerHeader?: boolean;
}

export default function ContainerLayout({
	children,
	spinnerHeader = false,
}: ContainerLayoutProps): JSX.Element {
	const gridProps = {
		templateAreas: `
    "header"
    "main"
    "footer"`,
		gridTemplateRows: 'auto 1fr auto',
		gridTemplateColumns: '100%',
		maxW: '1920px',
		h: '100vh',
		color: 'blackAlpha.700',
		fontWeight: 'bold',
	};
	return (
		<Grid {...gridProps}>
			<GridItem area={'header'} as='header' borderBottom={'1px solid #eee'}>
				<Header loading={spinnerHeader} />
			</GridItem>
			<GridItem pl='2' pr='2' area={'main'} as='main'>
				{children}
			</GridItem>
			<GridItem area={'footer'} as='footer' marginTop='1rem'>
				<Footer />
			</GridItem>
		</Grid>
	);
}
