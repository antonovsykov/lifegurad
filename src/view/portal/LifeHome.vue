<template>
  <main class="container" role="main">
    <section class="intro">
      <div class="features" role="list">
        <div class="feature-card" role="listitem" v-for="index in 4" :key="index">
          <strong>{{ t(`featurecardtitle${index - 1}`) }}</strong>
          <div>{{ t(`featurecarddesc${index - 1}`) }}</div>
        </div>
      </div>
    </section>

    <div class="contract">
      <div class="contract-info">
        <div data-en="LGUARD Contract:" data-zh="LGUARD合约:">LGUARD Contract:</div>
        <div class="contract-addr">{{ formattedAddress }}</div>
        <button class="contract-copy" @click="copyText(LGUARD_TOKEN_CONTRACT_ADDRESS)">
          <svg t="1756108006874" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6848" width="15" height="15">
            <path
              d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
              p-id="6849" fill="#707070"></path>
            <path
              d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
              p-id="6850" fill="#707070"></path>
            <path
              d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
              p-id="6851" fill="#707070"></path>
          </svg>
        </button>
      </div>
      <div class="contract-btn">
        <button class="buy-l-btn" data-en="Buy LGUARD" data-zh="购买LGUARD" @click="buyLguard">Buy LGUARD</button>
        <button class="view-l-btn" @click="viewPrice">{{ t('viewprice') }}</button>
      </div>
    </div>

    <h2 class="section-title" id="products-title">{{ t('insurance_products') }}</h2>

    <div class="search-box">
      <input type="text" id="search-input" placeholder="Search insurance products (e.g. Flight or 航班)"
        @input="searchProducts">
    </div>

    <section class="products" id="products-grid" aria-label="insurance products">
      <article :class="['product-card']" style="animation-delay: 0s;" :style="`background-image: url(${item.bgimg})`"
        v-for="(item, index) in PRODUCTS" :key="index">
        <div class="content">
          <h3 :data-en="item.title_en" :data-zh="item.title_zh">{{ item.title_en }}</h3>
          <div class="product-line">
            <span class="label" data-en="Deposit:" data-zh="起投金额：">Deposit:</span>
            <span :data-en="item.deposit + ' $LGUARD'" :data-zh="item.deposit + ' $LGUARD'">{{ item.deposit }}
              $LGUARD</span>
          </div>
          <div class="product-line">
            <strong data-en="Brief:" data-zh="一句话介绍：">Brief:</strong>
            <span :data-en="item.brief_en" :data-zh="item.brief_zh">{{ item.brief_en }}</span>
          </div>
          <p class="product-desc" :data-en="item.desc_en" :data-zh="item.desc_zh">{{ item.desc_en }}</p>
        </div>
        <button class="buy-btn" @click="openModal(index)" data-en="Buy Now" data-zh="立即投保">Buy Now</button>
      </article>
    </section>

    <!-- <div class="cta">
      <a href="claim.html" id="claim-btn" data-en="Go to Claims" data-zh="去理赔">Go to Claims</a>
    </div> -->
  </main>
  <!-- Modal for Insurance Purchase -->
  <div class="modal" id="purchase-modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 id="modal-title"></h2>
      <label data-en="Duration (months):" data-zh="持续时间(月)：" for="duration">Duration (months):</label>
      <select id="duration" v-model="buymodel.duration" @change="calculateTotal">
        <template v-for="item in selectMonths" :key="item.num">
          <option :value="item.num">{{ t(item.month) }} ({{ t(item.ror) }})</option>
        </template>
      </select>

      <label data-en="Shares:" data-zh="份额：" for="shares">Shares:</label>
      <input type="number" id="shares" v-model="buymodel.share" min="1" value="1" @change="calculateTotal">

      <label data-en="Email:" data-zh="邮箱：" for="email">Email:</label>
      <input type="email" id="email" v-model="buymodel.email">

      <div class="total">
        <span data-en="Total: " data-zh="总共：">Total: </span>
        <span id="total-amount">100,000$</span>
        <span> LGUARD</span>
      </div>
      <p>
        <span data-en="Confirm: I agree to the terms and conditions. Payout in two stages, maintain balance ≥ "
          data-zh="确认：我同意条款和条件。分两阶段支付，保持余额≥">Confirm: I agree to the terms and conditions. Payout in two stages,
          maintain balance ≥ </span>
        <span id="total-amount-2">100,000</span>
        <span>.</span>
      </p>
      <p id="view-details-id" class="view-details" data-en="View Details" data-zh="查看详情" @click="viewDetails">View
        Details</p>
      <button v-if="createStatus" :disabled="createStatus">{{ t("confirmandpay...") }}</button>
      <button v-else data-en="Confirm and Pay" data-zh="确认支付" @click="creatOrder">Confirm and Pay</button>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted, computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { WEBUI_BASE_URL } from '../../api/constants'
import { ElMessage } from 'element-plus'

import { LGUARD_TOKEN_CONTRACT_ADDRESS, handleTransfer, RECIPIENT, checkTransfer } from "../../web3/lguard"

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();

import { useAppKit, useAppKitAccount } from "@reown/appkit/vue";
const { open } = useAppKit();
const accountInfo = useAppKitAccount();

const formattedAddress = ref(null)
// 格式化地址
formattedAddress.value = computed(() => {
  return `${LGUARD_TOKEN_CONTRACT_ADDRESS.slice(0, 6)}...${LGUARD_TOKEN_CONTRACT_ADDRESS.slice(-4)}`
})

const buymodel = ref({
  ins_id: "",
  wallet_adr: "",
  duration: 1,
  share: 1,
  money: 0,
  total: 0,
  hash: "",
  email: "",
  status: 0,
  lang: "en"
})

const PRODUCTS = ref([]);

const searchProducts = (event) => {
  let queryVal = event.target.value.toLowerCase();
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const brief = card.querySelector('.product-line:nth-of-type(2) span').textContent.toLowerCase();
    const desc = card.querySelector('.product-desc').textContent.toLowerCase();
    if (title.includes(queryVal) || brief.includes(queryVal) || desc.includes(queryVal)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

let selectedProduct = null;
let selectMonths = ref([]);
function openModal(index) {
  createStatus.value = false;
  if (accountInfo.value.address) {
    selectedProduct = PRODUCTS.value[index];
    selectMonths.value = JSON.parse(selectedProduct.months);
    buymodel.value.duration = 1
    buymodel.value.share = 1
    buymodel.value.nums = selectedProduct.times
    let modalTitle = document.getElementById('modal-title');
    modalTitle.setAttribute('data-en', selectedProduct.title_en);
    modalTitle.setAttribute('data-zh', selectedProduct.title_zh);
    document.getElementById('total-amount').textContent = `${selectedProduct.deposit} $`;
    document.getElementById('view-details-id').setAttribute("data-id", selectedProduct.id);
    document.getElementById('purchase-modal').style.display = 'flex';
    checkDomLang();
    calculateTotal();
  } else {
    open()
  }
}

const closeModal = () => {
  document.getElementById('purchase-modal').style.display = 'none';
  createStatus.value = false;
}

const calculateTotal = () => {
  buymodel.value.ins_id = selectedProduct.id
  buymodel.value.money = selectedProduct.deposit
  const duration = buymodel.value.duration
  const shares = buymodel.value.share
  const baseAmount = selectedProduct.deposit
  const total = baseAmount * duration * shares
  document.getElementById('total-amount').textContent = `${total}$`
  document.getElementById('total-amount-2').textContent = `${total}`
  buymodel.value.total = total
}

// 获取路由实例
const router = useRouter()
const viewDetails = (event) => {
  router.push({
    path: '/details',
    query: { id: event.target.getAttribute("data-id") }
  })
}

function checkDomLang() {
  let currentLang = locale.value
  document.querySelectorAll('[data-en]').forEach(el => {
    const en = el.getAttribute('data-en');
    const zh = el.getAttribute('data-zh');
    if (currentLang === 'en' && en) el.textContent = en;
    if (currentLang === 'zh' && zh) el.textContent = zh;
  });
}

onBeforeMount(async () => {
  await getInsurance();
  checkDomLang();
});

onMounted(() => {
  checkDomLang();
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

const getInsurance = async () => {
  await fetch(`${WEBUI_BASE_URL}/api/insurance`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        PRODUCTS.value = data.data;
      }
    }
  }).catch((err) => {
    console.log("===========err============", err);
  });
}

const createStatus = ref(false)
const creatOrder = async () => {
  createStatus.value = true;
  const hash = await handleTransfer(RECIPIENT, buymodel.value.total);
  const payStatus = await checkTransfer(hash);
  if (!payStatus) {
    createStatus.value = false;
    ElMessage.error(t('payfailed'));
    return;
  }
  buymodel.value.wallet_adr = accountInfo.value.address
  buymodel.value.hash = hash
  buymodel.value.lang = locale.value;
  await fetch(`${WEBUI_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(buymodel.value)
  }).then(async (res) => {
    createStatus.value = false;
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        ElMessage.success(t('successinsured'))
        closeModal()
      } else {
        ElMessage.success(t('failedinsured'))
      }
    }
  }).catch((err) => {
    createStatus.value = false;
    console.log("=======payerr=====", err)
    ElMessage.success(t('failedinsured'))
  });
}

const copyText = (text) => {
  try {
    // 复制文本
    return navigator.clipboard.writeText(text).then(() => {
      ElMessage.success(t('copysuccess'));
      return true;
    }).catch(() => {
      ElMessage.error(t('copyfailed'));
      return false;
    });
  } catch (err) {
    ElMessage.error(t('copyfailed'));
    return false;
  }
}

const buyLguard = () => {
  window.open('https://www.dbcswap.io', '_blank');
}

const viewPrice = () => {
  window.open('https://app.xaiagent.io/zh/agent-detail/a3af87c0-70bc-44cd-98e6-cfb537fded70', '_blank');
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

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 20px
}

.feature-card {
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  flex: 1 1 240px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-left: 4px solid #055ab2;
}

.feature-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(7, 34, 77, 0.18)
}

.feature-card strong {
  font-size: 18px;
  display: block;
  margin-bottom: 8px;
  color: var(--primary)
}

.feature-card div {
  font-size: 13px;
  line-height: 1.5;
  color: #4a5e77
}

h2.section-title {
  font-size: 18px;
  margin: 18px 0 12px;
  color: #07324f;
  font-weight: 700
}

/* search box */
.search-box {
  margin-bottom: 16px
}

.search-box input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  outline: none;
}

.search-box input::placeholder {
  color: #8c9ab0
}

/* products grid */
.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.product-card {
  position: relative;
  overflow: hidden;
  min-height: 130px;
  border-radius: var(--card-radius);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px;
  box-shadow: var(--card-shadow);
  background-size: cover;
  background-position: center;
  transform: translateY(18px);
  opacity: 0;
  animation: fadeUp .56s ease forwards;
}

.product-card::before {
  /* dark gradient overlay to increase contrast */
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(3, 20, 40, 0.20) 0%, rgba(3, 20, 40, 0.66) 100%);
  z-index: 0;
}

.product-card .content {
  position: relative;
  z-index: 1
}

.product-card h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.05
}

.product-line {
  font-size: 13px;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.95)
}

.product-desc {
  font-size: 13px;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.92)
}

.label {
  font-weight: 600;
  color: var(--accent)
}

.buy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--accent);
  color: #0b2540;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  z-index: 1;
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

@keyframes fadeUp {
  to {
    transform: none;
    opacity: 1
  }
}

/* modal for insurance purchase */
.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-content h2 {
  margin: 0 0 16px;
  font-size: 20px
}

.modal-content label {
  display: block;
  margin: 12px 0 4px;
  font-weight: 600
}

.modal-content input,
.modal-content select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

.modal-content .total {
  margin: 16px 0;
  font-weight: 600;
  color: var(--primary)
}

.modal-content button {
  background: var(--primary);
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-weight: 600
}

.modal-content .close {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: #888
}

.view-details {
  cursor: pointer;
  color: var(--primary);
}

.contract {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.contract-info {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-right: 30px;
}

.contract-addr {
  margin-left: 10px;
  word-break: break-word;
}

.contract-copy {
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  margin-top: 3px;
  margin-left: 5px;
}

.contract-btn {
  display: flex;
  gap: 10px;
  justify-self: end;
}

.buy-l-btn {
  background: var(--primary);
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600
}

.view-l-btn {
  background: #888;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600
}

@media (max-width:800px) {
  .products {
    grid-template-columns: 1fr
  }

  .contract {
    grid-template-columns: 1fr
  }

  .contract-btn {
    justify-self: start;
  }
}
</style>