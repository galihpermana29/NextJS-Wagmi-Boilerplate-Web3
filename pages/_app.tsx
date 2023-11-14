import { AppProps } from "next/app"

import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { bscTestnet, goerli, polygon } from "wagmi/chains"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"

import { publicProvider } from "wagmi/providers/public"
import "../styles/tailwind.css"
import { WalletContextProvider } from "context/wallet-context"

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * You can add more provider (alchemy or infura)
   * read: https://wagmi.sh/react/providers/configuring-chains
   */

  const { chains, publicClient } = configureChains([polygon, goerli, bscTestnet], [publicProvider()])

  const config = createConfig({
    autoConnect: true, // this mean that everytime the page has reloaded, the state of the wallet connect status is keep remains
    connectors: [
      /**
       * Array of wallet connector, in this example im using metamask
       * See this documentation
       * read: https://wagmi.sh/react/connectors/injected
       */
      new MetaMaskConnector({
        chains,
        options: {
          /**
           * Read: https://wagmi.sh/react/connectors/metaMask
           */
          shimDisconnect: true, // this mean that everytime the connect button clicked, it will pop up to re-select the wallet account
          UNSTABLE_shimOnConnectSelectAccount: true,
        },
      }),
      new WalletConnectConnector({
        options: {
          projectId: "b19747725453e1a0c338eb997a5b52cb",
        },
      }),
    ],
    publicClient,
  })

  return (
    <WagmiConfig config={config}>
      <WalletContextProvider config={config}>
        <Component {...pageProps} />
      </WalletContextProvider>
    </WagmiConfig>
  )
}

export default MyApp
