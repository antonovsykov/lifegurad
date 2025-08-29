import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import { WagmiConfig } from '@wagmi/core' // 引入 Wagmi 配置组件
import { config } from './web3' // 引入刚才创建的配置
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App)

app.use(i18n)

// 挂载ElementPlus
app.use(ElementPlus)

app.use(router)

app.use(WagmiConfig, { config })

app.mount('#app')
