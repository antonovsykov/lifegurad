<template>
  <header>
    <div class="wrap">
      <div class="logo-wrap">
        <img src="@/assets/logo.png" alt="Lifeguard Logo" />
        <!-- Replace with your logo URL -->
        <div v-if="!isMobile">
          <h1>Lifeguard</h1>
          <!-- <p id="tagline">{{ t('title') }}</p> -->
        </div>
      </div>

      <div class="menu">
        <router-link to="/">{{ t('home') }}</router-link>
        <router-link to="/claims">{{ t('claim') }}</router-link>
        <router-link to="/blog">{{ t('blog') }}</router-link>
      </div>

      <div :class="isMobile ? 'right-side-col' : 'right-side'">
        <div class="lang-switch" aria-label="language switch">
          <button id="en-btn" :class="{ active: currentLang === 'en' }" @click="setLang('en')">EN</button>
          <button id="zh-btn" :class="{ active: currentLang === 'zh' }" @click="setLang('zh')">中</button>
        </div>

        <div class="wallet-connect" id="wallet-app">
          <button class="wallet-info" v-if="!isConnected" @click="openModal">
            <img v-if="isMobile" src="@/assets/walleticon.png" alt="Lifeguard Logo" />
            <span v-if="!isMobile">{{ t('connect_wallet') }}</span>
          </button>
          <button class="wallet-info wallet-target" v-else @click="showWalletInfo">
            <img v-if="walletIcon" :src="walletIcon" alt="Lifeguard Logo" />
            <span v-if="!isMobile">{{ formattedAddress }}</span>
          </button>
          <!-- 提示框（条件渲染） -->
          <div class="tooltip" v-if="showTooltip" :style="{
            top: `${buttonRect.top + buttonRect.height + 8}px`,
            left: `${buttonRect.left + buttonRect.width - 200}px`
          }">
            <button class="claim-btn" @click="toAccount">
              <svg t="1756422636950" class="icon" viewBox="0 0 1259 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="19365" width="20" height="20">
                <path
                  d="M702.247431 58.970526c-37.776394 16.763275-77.126805 33.605251-114.9819 50.368525-45.410374 19.675205-92.394765 40.609624-140.79577 61.544043h626.615941l-80.274838-125.921315a184.474726 184.474726 0 0 0-52.965653-33.60525c-16.605873-6.925672-37.776394-9.758902-63.511563-11.175517-25.735169-1.416615-54.539669 5.587758-86.2561 19.675205-21.249222 9.758902-49.975022 22.351033-87.830117 39.114309zM924.734654 477.344093h293.554064V315.062999a103.098076 103.098076 0 0 0-34.707062-76.969403 117.81513 117.81513 0 0 0-83.265469-32.188636H157.401643c-31.795132 0-60.599633 11.175517-83.265469 32.188636-22.665837 21.013119-34.785763 46.197382-34.785763 76.969403v597.496638c0 15.425361 2.990631 29.434107 9.050594 43.364152 7.63398 14.008746 16.684574 25.184263 27.309185 35.021866 12.041226 9.837603 24.161152 18.17989 39.350411 23.767648 15.110558 5.587758 30.221115 8.420988 46.90569 8.420988h942.835843c30.299816 0 60.599633-11.175517 81.770153-32.188636 10.54591-9.758902 18.101189-22.351033 24.239853-34.943165 5.981262-12.592131 9.050594-28.017492 9.050595-42.026239V695.738873h-295.128081c-30.299816 0-52.965653-5.509058-69.650227-16.763275a103.727683 103.727683 0 0 1-34.785764-37.776394 161.88759 161.88759 0 0 1-13.615242-55.956284c0-29.434107 12.119927-57.4516 34.785763-76.969404 22.744537-21.013119 49.975022-30.850722 83.26547-30.850722z"
                  p-id="19366" fill="#515151"></path>
                <path
                  d="M945.983876 632.778216a49.030612 49.030612 0 0 0 16.527172-36.438481 51.391637 51.391637 0 0 0-16.527172-36.359779 63.354161 63.354161 0 0 0-39.350411-14.008746 50.368526 50.368526 0 0 0-39.350411 14.008746 49.030612 49.030612 0 0 0-16.684574 36.359779c0 14.008746 6.059963 26.600878 16.605873 36.35978a57.215497 57.215497 0 0 0 39.350411 15.425361 57.215497 57.215497 0 0 0 39.350411-15.425361z"
                  p-id="19367" fill="#515151"></path>
              </svg>
              <span>{{ t('myaccount') }}</span>
            </button>
            <button class="claim-btn" @click="toPolicy">
              <svg t="1756423106047" class="icon" viewBox="0 0 1137 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="27907" width="20" height="20">
                <path
                  d="M0 779.719111h136.135111s83.911111-91.932444 174.648889-112.071111h387.982222c31.175111 0 56.661333 25.201778 56.661334 56.035556a56.547556 56.547556 0 0 1-56.661334 56.035555h-165.546666a37.319111 37.319111 0 0 0-37.376 36.977778c0 20.309333 16.839111 36.977778 37.432888 36.977778l289.507556-0.568889 220.273778-177.493334a58.709333 58.709333 0 0 1 81.464889 7.395556 56.945778 56.945778 0 0 1-7.509334 80.497778L798.037333 1024H0v-244.280889z m631.182222-311.125333c74.126222-12.174222 112.924444-59.448889 112.924445-116.167111 0-70.087111-55.921778-95.004444-106.382223-113.891556-40.277333-14.791111-77.767111-24.917333-77.767111-52.508444 0-21.617778 16.384-36.408889 50.460445-36.408889 28.672 0 55.239111 13.482667 82.488889 32.312889l45.056-59.960889c-27.420444-20.138667-62.293333-39.822222-106.780445-45.112889V7.964444a7.964444 7.964444 0 0 0-7.964444-7.907555h-55.580445a7.964444 7.964444 0 0 0-7.964444 7.964444v73.159111c-58.140444 14.449778-93.866667 55.921778-93.866667 110.250667 0 62.691556 55.978667 91.648 104.391111 109.795556 40.220444 15.530667 79.758222 28.330667 79.758223 56.604444 0 23.608889-17.066667 39.822222-55.182223 39.822222-35.498667 0-68.266667-14.848-102.343111-41.130666l-45.681778 62.008889a247.125333 247.125333 0 0 0 112.867556 50.403555v71.793778c0 4.380444 3.640889 7.964444 8.021333 7.964444h55.523556a7.964444 7.964444 0 0 0 8.021333-7.964444V468.593778z"
                  fill="#515151" p-id="27908"></path>
              </svg>
              <span>{{ t('mypplicy') }}</span>
            </button>
            <button class="claim-btn" @click="toApply">
              <svg t="1756423312552" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="33137" width="20" height="20">
                <path
                  d="M640 140.8H384c-32 0-57.6-25.6-57.6-57.6s25.6-57.6 57.6-57.6h256c32 0 57.6 25.6 57.6 57.6s-25.6 57.6-57.6 57.6z"
                  p-id="33138" fill="#515151"></path>
                <path
                  d="M812.8 108.8h-64c0 44.8-32 76.8-76.8 76.8h-320c-44.8 0-76.8-32-76.8-76.8h-64c-51.2 0-89.6 38.4-89.6 89.6V896c0 51.2 38.4 89.6 89.6 89.6h601.6c51.2 0 89.6-38.4 89.6-89.6V204.8c-6.4-51.2-44.8-96-89.6-96zM249.6 294.4h524.8c19.2 0 32 12.8 32 32s-12.8 32-32 32H249.6c-19.2 0-32-12.8-32-32s12.8-32 32-32z m0 166.4h524.8c19.2 0 32 12.8 32 32s-12.8 32-32 32H249.6c-19.2 6.4-32-12.8-32-25.6 0-19.2 12.8-38.4 32-38.4z m160 403.2H249.6c-19.2 0-32-12.8-32-32s12.8-32 32-32h160c19.2 0 32 12.8 32 32s-12.8 32-32 32z m0-166.4H249.6c-19.2 0-32-12.8-32-32s12.8-32 32-32h160c19.2 0 32 12.8 32 32s-12.8 32-32 32z m409.6 166.4c0 25.6-19.2 44.8-44.8 44.8h-192c-25.6 0-44.8-19.2-44.8-44.8v-19.2c0-32 44.8-64 76.8-76.8 6.4 0 12.8-6.4 19.2-6.4 6.4-6.4 0-12.8-6.4-19.2-19.2-12.8-32-38.4-32-64v-12.8c0-38.4 32-70.4 70.4-70.4h83.2c6.4 0 12.8 6.4 12.8 12.8v70.4c0 25.6-6.4 44.8-19.2 57.6 0 0-6.4 6.4-12.8 6.4-6.4 6.4-6.4 12.8-6.4 19.2 6.4 6.4 6.4 6.4 19.2 6.4 32 12.8 76.8 44.8 76.8 76.8v19.2z"
                  p-id="33139" fill="#515151"></path>
              </svg>
              <span>{{ t('claimapplication') }}</span>
            </button>
            <button class="disconnect-btn" @click="disConnect">{{ t('disconnect') }}</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { createWeb3Modal } from "@web3modal/wagmi"
import { watchConnections, disconnect } from "@wagmi/core";
import { projectId, config } from '../web3/index.js'

import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(async () => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)

  modal.value = createWeb3Modal({
    themeMode: "light",
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
  });
})

// 定义切换语言的函数
const { t, locale } = useI18n();
const currentLang = ref(locale.value);
function setLang(lang) {
  locale.value = lang;
  currentLang.value = lang;
  localStorage.setItem('user-lang', lang);
}

// web3
const modal = ref(null)
const address = ref(null)
const walletIcon = ref(null)
const isConnected = ref(false)
const formattedAddress = ref(null)
// 格式化地址
formattedAddress.value = computed(() => {
  if (!address.value) return ''
  return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
})
const openModal = () => {
  if (modal.value) {
    modal.value.open()
  }
}
const disConnect = async () => {
  try {
    await disconnect(config)
    clearConnections()
    address.value = null
    isConnected.value = false
    showTooltip.value = false
  } catch (error) {
    console.log("=============", error)
  }
}
function clearConnections() {
  config.state.connections.forEach((item) => {
    config.state.connections.delete(item.connector.uid);
  });
}
function checkConnections() {
  const lastEntry = Array.from(config.state.connections).pop();
  config.state.connections.forEach((item, index) => {
    if (index != lastEntry[0]) {
      config.state.connections.delete(item.connector.uid);
    }
  });
}
watchConnections(config, {
  async onChange(data) {
    checkConnections()
    if (data.length) {
      address.value = data.at(-1).accounts[0]
      walletIcon.value = data.at(-1).connector.icon ?? ''
      isConnected.value = true
    } else {
      clearConnections()
      address.value = null
      isConnected.value = false
    }
  },
});

// 屏幕尺寸
const screenWidth = ref(0)
const isMobile = ref(false)
const checkScreenSize = async () => {
  screenWidth.value = window.innerWidth
  if (screenWidth.value < 768) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
  await resetButtonRect()
}

// 钱包信息弹出框
const buttonRect = ref({ top: 0, left: 0, width: 0, height: 0 });
const showTooltip = ref(false);
const resetButtonRect = async () => {
  await nextTick();
  const btn = document.querySelector('.wallet-target');
  if (btn) {
    const rect = btn.getBoundingClientRect();
    buttonRect.value = {
      top: rect.top + window.scrollY,  // 加上滚动距离，确保定位准确
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height
    };
  }
}
const showWalletInfo = async () => {
  await resetButtonRect()
  showTooltip.value = !showTooltip.value
}

const toAccount = () => {
  showTooltip.value = false
  router.push('/account')
}

const toPolicy = () => {
  showTooltip.value = false
  router.push('/policy')
}

const toApply = () => {
  showTooltip.value = false
  router.push('/apply')
}
</script>

<style scoped>
* {
  box-sizing: border-box
}

header {
  background: linear-gradient(90deg, var(--primary), #0960b8);
  color: #fff;
  padding: 20px 16px;
  position: relative;
}

header .wrap {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px
}

header .logo-wrap {
  display: flex;
  align-items: center;
  gap: 16px
}

header .logo-wrap img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px
}

/* Logo placeholder style */
header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.5px
}

header p {
  margin: 0;
  font-size: 14px;
  opacity: 0.92;
  font-style: italic
}

header .menu {
  display: flex;
  flex-direction: row;
  gap: 16px;
  font-weight: bold;

  a {
    color: #fff;
    line-height: 40px;
    text-decoration: none;
  }
}

/* language switch and wallet */
.right-side {
  display: flex;
  align-items: center;
  gap: 16px
}

.right-side-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px
}

.lang-switch {
  display: flex;
  gap: 8px
}

.lang-switch button {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.lang-switch button.active {
  background: #fff;
  color: var(--primary)
}

/* wallet connect (Vue-managed) */
.wallet-connect {
  display: flex;
  gap: 8px
}


.wallet-info.connected {
  background: var(--primary);
  color: #fff
}

.wallet-connect .balance {
  display: none;
  color: #fff;
  font-size: 12px;
  margin-left: 8px
}

.wallet-info {
  display: flex;
  align-items: center;
  background: #fff;
  color: var(--primary);
  border: 1px solid var(--primary);
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  img {
    width: 16px;
  }

  span {
    margin-left: 5px;
  }
}

.tooltip {
  position: absolute;
  width: 200px;
  padding: 12px;
  background: #fff;
  color: white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.claim-btn {
  display: flex;
  align-items: center;
  background: none;
  padding: 8px;
  border: none;
  margin-top: 10px;
  text-align: left;
}

.claim-btn span {
  color: #515151;
  font-weight: bold;
  margin-left: 12px;
}

.disconnect-btn {
  background: var(--primary);
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
}


.router-link-active {
  border-bottom: 2px solid #fff;
}
</style>