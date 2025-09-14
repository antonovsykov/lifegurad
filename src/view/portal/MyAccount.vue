<template>
  <div class="container">
    <h1>{{ t('accountbalance') }}</h1>
    <p class="subtitle">{{ t('manageyourfundsandtran') }}</p>
    <div class="card">
      <div class="card-header">
        <div class="card-title">{{ t('walletinformation') }}</div>
        <div class="balance-address">
          <img :src="walletInfo.walletInfo?.icon" alt="Lifeguard Logo" />
          <span>{{ accountInfo.address }}</span>
        </div>
        <div class="balance-info">
          <label>DBC</label>
          <span v-if="balance.data">{{ formateDbcBalance(balance.data) }}</span>
          <span v-else>...</span>
        </div>
        <div class="balance-info">
          <label>LGUARD</label>
          <span v-if="lguardBalance">{{ formatNumber(lguardBalance) }}</span>
          <span v-else>...</span>
        </div>
      </div>
      <div class="tran-info">
        <div class="nodata">{{ t('nodata') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useAppKitAccount, useWalletInfo } from "@reown/appkit/vue"
import { useAccount } from '@wagmi/vue'
import { useBalance } from '@wagmi/vue'
import { getLaugrdBalance } from "../../web3/lguard"

const accountInfo = useAppKitAccount()
const walletInfo = useWalletInfo()
const { address } = useAccount()

import router from '@/router';

// 获取原生币余额 - 正确的响应式写法
const balance = useBalance({
  address: address
})

const formateDbcBalance = (data) => {
  const balance = data.value?.formatted || '0'
  return formatNumber(balance)
}

// 定义切换语言的函数
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const lguardBalance = ref()
onMounted(async () => {
  let address = accountInfo.value.address
  lguardBalance.value = await getLaugrdBalance(address)
})

// 监听 accountInfo 变化
watch(
  accountInfo?.value, 
  async (newInfo, oldInfo) => {
    console.log(`用户从 ${oldInfo} 切换到了 ${newInfo}`)
    if (newInfo?.address) {
      lguardBalance.value = await getLaugrdBalance(newInfo?.address)
    } else {
      router.push("/")
    }
  },
  { immediate: false }
)

const formatNumber = (num) => {
  // 四舍五入保留两位小数
  const rounded = Math.round(num * 100) / 100;
  // 检查是否为整数（小数位为0）
  if (rounded % 1 === 0) {
    return rounded; // 整数直接返回（如 123.00 → 123）
  }
  // 处理有小数的情况，确保保留两位有效小数
  return rounded.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
  margin-bottom: 80px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark);
}

.card-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.balance-address {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.balance-address img {
  width: 16px;
  height: 16px;
  border-radius: 16px;
  margin-right: 5px;
}

.balance-info {
  display: flex;
  align-items: center;
  padding-top: 16px;
  font-size: 12px;
}

.balance-info label {
  width: 100px;
  font-weight: bold;
  color: #5e5e5e;
}

.balance-info span {
  font-size: 14px;
  color: #000;
}

.nodata {
  line-height: 100px;
  text-align: center;
  color: #888888;
}
</style>