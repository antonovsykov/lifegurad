import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    layoutType: 'portal' // 默认门户端布局
  }),
  actions: {
    setLayout(type) {
      this.layoutType = type // 切换为 admin 或 portal
    }
  }
})