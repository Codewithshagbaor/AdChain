import { pharosdevnet } from "@/chains/customChains";
import { createConfig, http } from "wagmi";

import { getDefaultConfig } from "connectkit";

export const config = createConfig(
    getDefaultConfig({
      // Your dApp's chains
      chains: [pharosdevnet],
      transports: {
        // You may want to use a custom RPC url here
        [pharosdevnet.id]: http(pharosdevnet.rpcUrls.default.http[0])
      },
      // Required API Keys
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  
      // Required App Info
      appName: "AdChain",
  
      // Optional App Info
      appDescription: "AdChain connects Web3 advertisers with crypto-native publishers through transparent, smart contract-based payments with instant settlements.",
    })
  );
