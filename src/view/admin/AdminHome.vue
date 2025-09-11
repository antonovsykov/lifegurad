<template>
  <div class="continer">
    <AdminHeader />
    <div class="main">
      <AdminMenu/>
      <router-view/>
    </div>
    <AdminFooter />
  </div>
</template>

<script setup>
import AdminHeader from './AdminHeader.vue'
import AdminMenu from './AdminMenu.vue'
import AdminFooter from './AdminFooter.vue'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(async () => {
  router.push('/admin/dashboard')
});

</script>

<style scoped>
.continer {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
</style>