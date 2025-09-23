<template>
  <div class="container">
    <object width="100%" height="1000" :data="state.source + '#toolbar=0&navpanes=0&statusbar=0&view=FitH'"
      type="application/pdf" style="background-color: white; border: none;" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive } from 'vue';
import { createLoadingTask } from "vue3-pdfjs";

// 获取当前路由实例
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.query.id;

// 定义切换语言的函数
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();

// 加载HTML内容的函数
const state = reactive({
  source: "", //预览pdf文件地址
  pageNum: 1, //当前页面
  scale: 1, // 缩放比例
  numPages: 0, // 总页数
});
const loadPdfContent = async (lang: string) => {
  const pdfPath = lang == 'zh' ? require(`@/assets/pdf/${id}/zh.pdf`) : require(`@/assets/pdf/${id}/en.pdf`)
  state.source = pdfPath
  const loadingTask = createLoadingTask(state.source);
  loadingTask.promise.then((pdf: { numPages: number }) => {
    state.numPages = pdf.numPages;
  });
};


onMounted(async () => {
  await loadPdfContent(locale.value)
});


watch(
  locale, async (newLocale, oldLocale) => {
    console.log(`语言从 ${oldLocale} 切换到了 ${newLocale}`)
    await loadPdfContent(newLocale)
  },
  { immediate: false } // 可选：是否在初始化时立即执行一次
)
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