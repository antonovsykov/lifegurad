<template>
  <LifeHead/>
  <router-view />
</template>

<script>
import LifeHead from './components/LifeHead.vue'

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
