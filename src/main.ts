import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createAppKit } from '@reown/appkit/vue'
import { WagmiPlugin } from '@wagmi/vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import {wagmiAdapter, networks, projectId } from './web3/index'

import store from './store'

const app = createApp(App)

app.use(i18n)

// 挂载ElementPlus
app.use(ElementPlus)

app.use(router)

app.use(store)

// 初始化AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  themeMode: 'light',
  features: {
    connectMethodsOrder: ['wallet'],
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  metadata: {
    name: 'LifeGurad',
    description: 'AppKit Vue Example',
    url: 'https://reown.com/appkit',
    icons: ['https://www.lifeguard.chat/logo.png']
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

// 挂载Wagmi
const queryClient = new QueryClient()
app.use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig })
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
