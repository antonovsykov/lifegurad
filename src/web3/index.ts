import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, base, type AppKitNetwork } from '@reown/appkit/networks'

export const projectId = "669b5cd517fea9a8736980e7dd8f5900"
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const dbcNetwork: AppKitNetwork = {
  id: 19880818, // 你的自定义链的 Chain ID
  name: 'LifeGurad',
  rpcUrls: { // 注意这里是 rpcUrls (复数) 并且是一个对象
    default: {
      http: ['https://rpc1.dbcwallet.io'] // RPC URL 应该放在数组中
    }
  },
  nativeCurrency: {
    name: 'DBC',
    symbol: 'DBC',
    decimals: 18
  },
  blockExplorers: { // 注意这里是 blockExplorers (复数) 并且是一个对象
    default: {
      name: 'DBCScan',
      url: 'https://www.dbcscan.io'
    }
  }
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [dbcNetwork]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})