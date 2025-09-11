<template>
  <div class="continer">
    <AdminHeader />
    <div class="login-continer">
      <div class="login-form">
        <span class="login-tip">{{ t('backmanager')}}</span>
        <div>
          <span class="input-tip">{{ t('username')}}</span>
          <el-input v-model="loginForm.username" />
        </div>
        <div>
          <span class="input-tip">{{ t('password')}}</span>
          <el-input v-model="loginForm.password" show-password/>
        </div>
        <el-button class="login-btn" type="primary" @click="login">登陆</el-button>
      </div>
    </div>
    <AdminFooter />
  </div>
</template>

<script setup>
import AdminHeader from './AdminHeader.vue'
import AdminFooter from './AdminFooter.vue'
import { onBeforeMount, ref } from 'vue'
import { WEBUI_BASE_URL } from '../../api/constants'
import { ElMessage } from 'element-plus'

import { useI18n } from 'vue-i18n'
const { t } = useI18n();

import { useRouter } from 'vue-router'
const router = useRouter()

onBeforeMount(async () => {
  let userinfo = localStorage.getItem("token")
  if (userinfo) {
    tomain();
  }
});

const loginForm = ref({
  username: "",
  password: ""
})


const login = async () => {
  await fetch(`${WEBUI_BASE_URL}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginForm.value)
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        ElMessage.success(t('loginsuccess'))
        localStorage.setItem("token", JSON.stringify(data.data))
        tomain();
      } else {
        ElMessage.error(t('loginfailed'))
      }
    } else {
      ElMessage.error(t('loginfailed'))
    }
  }).catch(() => {
    ElMessage.error(t('loginfailed'))
  });
}

const tomain = async () => {
  router.push('/admin/home')
}

</script>

<style scoped>
.continer {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.login-continer {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  padding: 30px 16px 40px 16px;
  border: 1px solid #b3b3b3;
  border-radius: 8px;
  gap: 10px;
}

.login-tip {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.input-tip {
  font-size: 14px;
  font-weight: bold;
  padding-left: 3px;
}

.login-btn {
  margin-top: 10px;
}
</style>