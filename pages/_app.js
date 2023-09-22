import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { lightTheme,   Theme} from '@rainbow-me/rainbowkit';

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	goerli,
	polygonMumbai,
	optimismGoerli,
	arbitrumGoerli,
	sepolia,
	avalancheFuji,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
import merge from 'lodash.merge';

const { chains, provider } = configureChains(
	[
		sepolia,
		avalancheFuji
	],
	[publicProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "My Alchemy DApp",
	projectId: "9e6bf90ef0ddafc9bcab0d31eaf9a548",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const myTheme = merge(lightTheme(), {
	colors: {
	  accentColor: '#07296d',
	}, fonts: {
		body: '"Circular-Light",Arial,"Helvetica Neue",Helvetica,sans-serif',
	}, radii: {
		connectButton: 'none',
	}, shadows: {
		connectButton: '10px',
	}, colors: {
		selectedOptionBorder: 'none',
		generalBorder: 'black',
		generalBorderDim: 'black',
	},
  });

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
						>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
