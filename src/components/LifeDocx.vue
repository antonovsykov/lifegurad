<template>
  <div>
    <div ref="docxContainer" class="docx-container"></div>
    <div v-if="error" class="error-message text-red-500 mt-2">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { renderAsync } from 'docx-preview';
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

// 定义切换语言的函数
const { locale } = useI18n();

const docxContainer = ref(null);
const loading = ref(false);
const error = ref('');

const route = useRoute()
const loadDocx = async () => {
  if (!docxContainer.value) {
    error.value = '容器未初始化';
    return;
  }
  const id = route.query.id;
  if (!id) {
    error.value = '缺少文档ID参数';
    return;
  }
  loading.value = true;
  error.value = '';
  try {
    let currentLang = locale.value
    const response = await fetch(`https://lifeguard.chat/file/${id}/${currentLang}.docx`);
    if (!response.ok) {
      throw new Error(`文件加载失败: ${response.statusText}`);
    }
    const blob = await response.blob();
    if (!blob.type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      throw new Error('加载的不是有效的DOCX文件');
    }
    docxContainer.value.innerHTML = '';
    await renderAsync(blob, docxContainer.value);
    console.log('DOCX 文档渲染完成');
  } catch (err) {
    console.error('加载文档失败:', err);
    error.value = err.message || '加载文档时发生错误';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadDocx();
});

watch(
  locale, async (newLocale, oldLocale) => {
    console.log(`语言从 ${oldLocale} 切换到了 ${newLocale}`)
    await loadDocx();
  },
  { immediate: false } // 可选：是否在初始化时立即执行一次
)
</script>

<style scoped>
.docx-container {
  margin-top: 1rem;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  min-height: 300px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.docx-container {
  margin-top: 1rem;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  min-height: 300px;
  display: flex;
  justify-content: center;
}

.docx-wrapper {
  max-width: 1200px;
  background: #fff !important;
  padding: 20px !important;
  padding-bottom: 0px;
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>