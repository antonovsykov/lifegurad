<template>
  <div class="menu">
    <div :class="['menu-item', currItem == index ? 'active' : '']" v-for="item, index in menus" :key="index">
      <img class="menu-icon" :src="require(`@/assets/svg/${item.icon}`)" />
      <button class="menu-btn" @click="itemClick(index)">{{ t(item.title) }}</button>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

import { ElMessageBox } from 'element-plus';

const menus = ref([
  { title: 'dashboard', icon: 'dashboard.svg', url: '/admin/dashboard' },
  { title: 'policymanag', icon: 'mypplicy.svg', url: '/admin/policy' },
  { title: 'claimmanag', icon: 'claimapply.svg', url: '/admin/claim' },
  { title: 'blogmanag', icon: 'blog.svg', url: '/admin/blog' },
  { title: 'loginout', icon: 'logout.svg', url: '' }
])

const currItem = ref(0)

const itemClick = async (index) => {
  currItem.value = index;
  if (index == 4) {
    await logOut()
  } else {
    router.push(menus.value[index].url)
  }
}

const logOut = async () => {
  // 调用确认框
  try {
    const result = await ElMessageBox.confirm(
      '确定要退出吗?',
      '退出确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );
    if (result === 'confirm') {
      localStorage.clear()
      router.push("/admin")
    }
  } catch(err) {
    console.log("================", err)
  }
}

</script>

<style scoped>
* {
  box-sizing: border-box
}

.menu {
  width: 260px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #bbbbbb;
  padding-top: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
}

.menu-icon {
  margin-right: 5px;
  cursor: pointer;
}

.menu-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
}

.active {
  background-color: rgba(52, 152, 219, 0.1);
  color: var(--primary);
}
</style>