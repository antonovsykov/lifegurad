<template>
  <LifeHead/>
  <router-view />
</template>

<script>
import LifeHead from './components/LifeHead.vue'

import { createAppKit } from '@reown/appkit/vue'
import {wagmiAdapter, networks, projectId } from './web3/index'

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
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

export default {
  name: 'App',
  components: {
    LifeHead
  }
}
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  background: var(--bg);
  color: #0b2540;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:root {
  --primary: #0b66d0;
  --accent: #ffd24d;
  --bg: #f4f7fb;
  --light: #f8f9fa;
  --card-radius: 12px;
  --card-shadow: 0 8px 24px rgba(7, 34, 77, 0.12);
}
</style>