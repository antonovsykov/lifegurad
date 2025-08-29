import { defaultWagmiConfig } from "@web3modal/wagmi"
import { http } from "@wagmi/core";

export const projectId = '59443aa943b8865491317c04a19a8be3' 

const dbcTestnet = {
  id: 19880818,
  name: "dbcTestnet",
  nativeCurrency: {
    name: "DBC",
    symbol: "DBC",
    decimals: 18,
  },
  // network: "dbcTestnet",
  rpcUrls: {
    default: { http: ["https://rpc1.dbcwallet.io"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://www.dbcscan.io",
    },
  },
}

const chains = [dbcTestnet]

const metadata = {
  name: "degpt",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const config = defaultWagmiConfig({
  projectId,
  chains,
  metadata,
  transports: {
    [dbcTestnet.id]: http("https://rpc1.dbcwallet.io"),
  },
});