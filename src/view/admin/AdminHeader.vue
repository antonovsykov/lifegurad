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
      <div class="right-side">
        <div class="lang-switch" aria-label="language switch">
          <button id="en-btn" :class="{ active: currentLang === 'en' }" @click="setLang('en')">EN</button>
          <button id="zh-btn" :class="{ active: currentLang === 'zh' }" @click="setLang('zh')">中</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n();
const currentLang = ref(locale.value);
function setLang(lang) {
  locale.value = lang;
  currentLang.value = lang;
  localStorage.setItem('user-lang', lang);
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
  width: 100%;
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