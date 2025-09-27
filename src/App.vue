<template>
  <router-view />
</template>

<script setup>
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
  storage: 'localStorage',
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
</script>