import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { type AppKitNetwork } from '@reown/appkit/networks'
import { createConfig, http } from '@wagmi/core'

export const projectId = "669b5cd517fea9a8736980e7dd8f5900"
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

const dbcChain = {
  id: 19880818, // DBC链的chainId
  name: 'LifeGurad',
  nativeCurrency: {
    name: 'DBC',
    symbol: 'DBC',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc1.dbcwallet.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'DBCScan',
      url: 'https://www.dbcscan.io', // DBC区块浏览器地址
    },
  },
}

// 定义连接RPC网络
export const dbcNetwork: AppKitNetwork = dbcChain

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [dbcNetwork]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

export const config = createConfig({
  chains: [dbcChain],
  transports: {
    [dbcChain.id]: http("https://rpc1.dbcwallet.io"),
  },
})