<template>
  <div class="container">
    <div v-html="htmlContent"></div>
  </div>
</template>

<script setup>
import { WEBUI_BASE_URL } from '../../api/constants'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
// 获取当前路由实例
const route = useRoute()

const htmlContent = ref("")
onBeforeMount(async () => {
  await getBlog(route.params.id)
})
const getBlog = async (id) => {
  await fetch(`${WEBUI_BASE_URL}/api/blog/id/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        htmlContent.value = data.data.content
      }
    }
  }).catch((err) => {
    console.log("===========err============", err);
  });
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
  margin-bottom: 80px;
  min-height: calc(100vh - 300px);
}
</style>