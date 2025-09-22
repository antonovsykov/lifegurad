import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { WagmiPlugin } from '@wagmi/vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { wagmiAdapter } from './web3/index'

import store from './store'

const app = createApp(App)

app.use(i18n)

// 挂载ElementPlus
app.use(ElementPlus)

app.use(router)

app.use(store)

// 挂载Wagmi
const queryClient = new QueryClient()
app.use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig })
app.use(VueQueryPlugin, { queryClient })

console.log("====================", process.env.VUE_APP_API_URL)

app.mount('#app')
