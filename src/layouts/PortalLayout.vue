<template>
  <LifeHead/>
  <router-view class="router-style"/>
  <LifeFooter/>
</template>

<script setup>
import LifeHead from '../view/portal/LifeHead.vue'
import LifeFooter from '../view/portal/LifeFooter.vue'
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  background: var(--bg);
  color: #0b2540;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
:root {
  --primary: #0b66d0;
  --accent: #ffd24d;
  --bg: #f4f7fb;
  --light: #f8f9fa;
  --card-radius: 12px;
  --card-shadow: 0 8px 24px rgba(7, 34, 77, 0.12);
}

.router-style {
  min-height: calc(100vh - 300px);
}
</style>