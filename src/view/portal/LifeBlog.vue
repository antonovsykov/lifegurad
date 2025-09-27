<template>
  <div class="container">
    <div id="article-grid" class="article-grid">
      <div class="article-card" v-for="(item, index) in releaseData" :key="index">
        <a :href="`/blog/${item.id}`" target="_self">
          <img :src="`${WEBUI_BASE_URL}/uploads/${item.picture}`" :alt="item.pic_alt" :title="item.pic_alt" />
          <div class="atricle-title">
            <h3>{{ item.title }}</h3>
          </div>
          <p>{{ item.description }}</p>
        </a>
        <div class="atricle-botm">
          <div class="date-type">
            <span class="date">{{ formateDate(item.create_at) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-continer">
      <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage"
        @current-change="handlePageChange" background="false" />
    </div>

  </div>
</template>

<script setup>
import { WEBUI_BASE_URL } from '../../api/constants'
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue'
onMounted(async () => {
  await updateGridLayout()
  window.addEventListener('resize', updateGridLayout)
  await getRelease()
})

const updateGridLayout = async () => {
  const grid = document.querySelector('.article-grid');
  const width = window.innerWidth;
  // 移除所有布局类
  grid.classList.remove('tablet', 'desktop', 'large-desktop');
  // 根据屏幕宽度添加相应的类
  if (width >= 1243) {
    grid.classList.add('large-desktop');
  } else if (width >= 930) {
    grid.classList.add('desktop');
  } else if (width >= 620) {
    grid.classList.add('tablet');
  }
}

const releaseDataAll = ref([])
const releaseData = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1);
const getRelease = async () => {
  await fetch(`${WEBUI_BASE_URL}/api/blog/release`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        releaseDataAll.value = data.data
        total.value = data.count
        handlePageChange(1)
      }
    }
  }).catch((err) => {
    console.log("===========err============", err);
  });
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
  releaseData.value = releaseDataAll.value.slice((newPage - 1) * pageSize.value, newPage * pageSize.value)
}

const formateDate = (datetime) => {
  return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
  margin-bottom: 80px;
  min-height: calc(100vh - 260px);
}

.article-grid {
  display: grid;
  grid-template-columns: 1fr;
  /* 默认单列布局 */
  grid-gap: 20px;
}

/* 平板设备布局 */
.article-grid.tablet {
  grid-template-columns: repeat(2, minmax(280px, 1fr));
}

/* 大屏设备布局 */
.article-grid.desktop {
  grid-template-columns: repeat(3, minmax(280px, 1fr));
}

/* 更大屏设备布局 */
.article-grid.large-desktop {
  grid-template-columns: repeat(3, minmax(280px, 1fr));
}

.article-card {
  position: relative;
  background-color: #ffffff;
  padding: 20px;
  font-family: Monda;
  color: #000000;
  border: 1px solid #363636;
  border-radius: 18px;
}

.article-card a {
  text-decoration: none;
}

.article-card img {
  width: 100%;
  border-radius: 18px;
  aspect-ratio: 16 / 9;
  border: 2px solid #000000;
  margin-bottom: 20px;
}

.atricle-title {
  height: 90px;
  color: #000000
}

.article-card h3 {
  max-width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  /* 限制为三行 */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
}

.article-card p {
  max-width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;
  color: hsla(0, 0%, 0%, 0.6);
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  /* 限制为五行 */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
}

.atricle-botm {
  width: calc(100% - 40px);
  position: absolute;
  bottom: 15px;
  font-size: 12px;
  font-weight: bold;
  color: hsla(0, 0%, 0%, 0.6);
  font-weight: 600;

  .date-type {
    display: flex;
    justify-content: end;
  }

  .atricle-source {
    display: flex;
    flex-direction: row;

    .title {
      white-space: nowrap;
    }

    a {
      margin-left: 10px;
      font-size: 12px;
      font-weight: bold;
      color: hsla(0, 0%, 0%, 0.5);
      font-weight: 600;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      /* 限制为三行 */
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.page-continer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>