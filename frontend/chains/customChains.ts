import { type Chain } from "viem";

export const pharosdevnet: Chain = {
  id: 50002,
  name: "Pharos Devnet",
  nativeCurrency: {
    decimals: 18,
    name: "Pharos Devnet",
    symbol: "PTT",
  },
  rpcUrls: {
    default: { http: ["/api/pharos"] },
  },
  blockExplorers: {
    default: { name: "PharosDevnet", url: "https://pharosscan.xyz/" },
  },
  testnet: true,
};