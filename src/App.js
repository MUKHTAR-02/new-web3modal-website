import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

// import WalletCard from './WalletCard';

import { Web3Modal, Web3Button } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";
import "./App.css";

// import { useAccount, useContract, useSigner } from 'wagmi'

function connectMetamask() {
  <Web3Button />;
}

function App() {
  const chains = [arbitrum, mainnet, polygon];
  const projectId = process.env.REACT_APP_PROJECT_ID;

  // wagmi client
  const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
      projectId,
      version: 2,
      appName: "web3Modal",
      chains,
    }),
    provider,
  });
  

  // web3modal Ethereum client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <div class="imageOfMetamask">
          <button>
            <img src="metamask logo.jpg" alt="" srcset="" />
          </button>
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <Web3Button />
    </div>
  );
}

export default App;
