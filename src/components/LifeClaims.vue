<template>
  <main class="container" role="main">
    <div class="claims">
      <div class="claim-item">
        <h3 data-en="Flight Delay Insurance" data-zh="航班延误险">Flight Delay Insurance</h3>
        <p data-en="Status: Under Review" data-zh="状态：审核中">Status: Under Review</p>
        <p data-en="Note: Upload flight delay screenshot or wait for automatic system detection"
          data-zh="说明：请上传航班延误截图或等待系统自动识别">Note: Upload flight delay screenshot or wait for automatic system detection
        </p>
        <button data-en="Submit Claim" data-zh="提交申请" onclick="submitClaim()">Submit Claim</button>
      </div>
      <div class="claim-item">
        <h3 data-en="Cold Medical Insurance" data-zh="感冒医疗险">Cold Medical Insurance</h3>
        <p data-en="Status: First Stage Paid" data-zh="状态：第一期已到账">Status: First Stage Paid</p>
        <p data-en="Cooling Period: 5 days left" data-zh="冷却期：剩余 5 天">Cooling Period: 5 days left</p>
        <p data-en="Note: Second stage will be paid after cooling period, maintain balance ≥100,000"
          data-zh="说明：第二期将在冷却期结束后发放，需保持余额 ≥100,000">Note: Second stage will be paid after cooling period, maintain
          balance ≥100,000</p>
      </div>
      <div class="claim-item">
        <h3 data-en="Streaming Subscription Insurance" data-zh="流媒体订阅险">Streaming Subscription Insurance</h3>
        <p data-en="Status: Not Claimed" data-zh="状态：未申请">Status: Not Claimed</p>
        <button data-en="Claim Now" data-zh="申请理赔" onclick="submitClaim()">Claim Now</button>
      </div>
    </div>

    <div class="cta">
      <a href="https://blockchain.explorer.example/txs" target="_blank" rel="noopener" data-en="View On-Chain Records"
        data-zh="查看链上记录">View On-Chain Records</a>
    </div>
  </main>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

// 定义切换语言的函数
const { locale } = useI18n();

onMounted(() => {
  let currentLang = locale.value
  document.querySelectorAll('[data-en]').forEach(el => {
    const en = el.getAttribute('data-en');
    const zh = el.getAttribute('data-zh');
    if (currentLang === 'en' && en) el.textContent = en;
    if (currentLang === 'zh' && zh) el.textContent = zh;
  });
})

watch(
  locale, (newLocale, oldLocale) => {
    console.log(`语言从 ${oldLocale} 切换到了 ${newLocale}`)
    document.querySelectorAll('[data-en]').forEach(el => {
      const en = el.getAttribute('data-en');
      const zh = el.getAttribute('data-zh');
      if (newLocale === 'en' && en) el.textContent = en;
      if (newLocale === 'zh' && zh) el.textContent = zh;
    });
  },
  { immediate: false } // 可选：是否在初始化时立即执行一次
)
</script>

<style scoped>
* {
  box-sizing: border-box
}

body {
  margin: 0;
  font-family: "Roboto", sans-serif;
  background: var(--bg);
  color: #0b2540;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

/* language switch */
.right-side {
  display: flex;
  align-items: center;
  gap: 16px
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

.container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px
}

.claims {
  margin-top: 30px;
}

.claim-item {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cta {
  display: flex;
  justify-content: center;
  margin: 26px 0
}

.cta a {
  background: var(--primary);
  color: #fff;
  padding: 12px 22px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700
}

.cta a:hover {
  background: #055ab2
}
</style>