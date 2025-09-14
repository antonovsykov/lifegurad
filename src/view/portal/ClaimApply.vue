<template>
  <div class="container">
    <h1>{{ t('claimapplication') }}</h1>
    <p class="subtitle">{{ t('submitandmanageyourclaimapplications') }}</p>

    <div class="card">
      <div class="card-header">
        <div class="card-title">{{ t('claimshistory') }}</div>
        <div class="filters">
          <button :class="['filter-btn', typeSel=='all' ? 'active' : '']" data-claim-filter="all" @click="getTypeMyClaims('all')">{{ t('all')
          }}</button>
          <button :class="['filter-btn', typeSel=='pending' ? 'active' : '']" data-claim-filter="pending" @click="getTypeMyClaims('pending')">{{ t('pending')
          }}</button>
          <button :class="['filter-btn', typeSel=='approved' ? 'active' : '']" data-claim-filter="approved" @click="getTypeMyClaims('approved')">{{ t('approved')
          }}</button>
          <button :class="['filter-btn', typeSel=='partial' ? 'active' : '']" data-claim-filter="partial" @click="getTypeMyClaims('partial')">{{ t('instalpay')
          }}</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>{{ t('insurancetype') }}</th>
            <th>{{ t('submittime') }}</th>
            <th>{{ t('policyterm') }}</th>
            <th>{{ t('onestpayoutinstallment') }}</th>
            <th>{{ t('twostpayoutinstallment') }}</th>
            <th>{{ t('totalamount') }}</th>
            <th>{{ t('status') }}</th>
            <th>{{ t('action') }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="myClaims.length > 0">
            <tr data-claim-status="approved" v-for="(item, index) in myClaims" :key="index">
              <td :data-en="item.title_en" :data-zh="item.title_zh">{{ item.title_en }}</td>
              <td>{{ formateDate(item.submit_time) }}</td>
              <td>{{ item.duration + t('month') }}</td>
              <td>{{ item.first_money }} LGUARD</td>
              <td>{{ item.second_money }} LGUARD</td>
              <td>{{ parseInt(item.first_money) + parseInt(item.second_money) }} LGUARD</td>
              <td>
                <span v-if="item.status == 3" class="status-badge status-fully-paid">{{ t('payall') }}</span>
                <span v-if="item.status == 1" class="status-badge status-pending">{{ t('underreview') }}</span>
                <span v-if="item.status == 2" class="status-badge status-partial">{{ t('onepaid') }}</span>
                <span v-if="item.status == 0" class="status-badge status-rejected">{{ t('rejected') }}</span>
              </td>
              <td><button class="action-btn btn-primary" @click="openDetailModal(item)">{{ t('viewdetails') }}</button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr data-claim-status="approved">
              <td class="nodata" colspan="8">{{ t('nodata') }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="detail-modal" id="detailModal">
      <div class="detail-content">
        <div class="modal-header">
          <h2>{{ t('claimdetails') }}</h2>
          <button class="close-btn" @click="closeDetailModal">&times;</button>
        </div>
        <div class="detail-body">
          <div class="form-group">
            <label>{{ t('policytype') }}</label>
            <p id="detailPolicyType">{{ insTitle }}</p>
          </div>

          <div class="form-group">
            <label>{{ t('submittime') }}</label>
            <p id="detailSubmitTime">{{ formateDate(selPolicy.submit_time) }}</p>
          </div>

          <div class="form-group">
            <label>{{ t('总赔付金额') }}</label>
            <p id="detailTotalAmount">{{ parseInt(selPolicy.first_money) + parseInt(selPolicy.second_money) }} LGUARD</p>
          </div>

          <div class="form-group">
            <label>{{ t('currentstatus') }}</label>
            <p v-if="selPolicy.status == 0" class="status-rejected2">{{ t('rejected') }}</p>
            <p v-if="selPolicy.status == 1" class="status-pending2">{{ t('underreview') }}</p>
            <p v-if="selPolicy.status == 2" class="status-partial2">{{ t('onepaid') }}</p>
            <p v-if="selPolicy.status == 3" class="status-fully-paid2">{{ t('payall') }}</p>
          </div>

          <div class="payment-stages" v-if="selPolicy.status > 1">
            <div class="payment-stage">
              <div class="stage-label">{{ t('firstinstallment') }}</div>
              <div class="stage-amount"></div>
              <span class="stage-status status-fully-paid">{{ t('paid') }}</span>
            </div>
            <div class="payment-stage">
              <div class="stage-label">{{ t('secondinstallment') }}</div>
              <div class="stage-amount"></div>
              <span v-if="selPolicy.status == 2" class="stage-status status-pending">{{ t('pendingpayment') }}</span>
              <span v-if="selPolicy.status == 3" class="stage-status status-fully-paid">{{ t('paid') }}</span>
            </div>
          </div>

          <div class="payment-timeline">
            <div class="timeline-item">
              <div class="timeline-date">{{ formateDate(selPolicy.submit_time) }}</div>
              <div class="timeline-content">{{ t('submissionofclaimapply') }}</div>
            </div>
            <div class="timeline-item" v-if="selPolicy.status > 1">
              <div class="timeline-date">{{ formateDate(selPolicy.first_time) }}</div>
              <div class="timeline-content">{{ t('approvedfirstpaycompleted') }}</div>
            </div>
            <div class="timeline-item" v-if="selPolicy.status > 2">
              <div class="timeline-date">{{ formateDate(selPolicy.second_time) }}</div>
              <div class="timeline-content">{{ t('secondpaycompleted') }}</div>
            </div>
            <div class="timeline-item" v-if="selPolicy.status == 0">
              <div class="timeline-date">{{ formateDate(selPolicy.reject_time) }}</div>
              <div class="timeline-content">{{ t('claimapplyrejectd') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { WEBUI_BASE_URL } from '../../api/constants'

import dayjs from 'dayjs';
import { useAppKitAccount } from "@reown/appkit/vue";
const accountInfo = useAppKitAccount();

import router from '@/router';

// 定义切换语言的函数
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();

onMounted(async () => {
  await getMyClaims()
  checkDomLang()
})

watch(
  locale, (newLocale, oldLocale) => {
    console.log(`语言从 ${oldLocale} 切换到了 ${newLocale}`)
    checkDomLang()
  },
  { immediate: false } // 可选：是否在初始化时立即执行一次
)

// 监听 accountInfo 变化
watch(
  accountInfo.value, 
  async (newInfo, oldInfo) => {
    console.log(`用户从 ${oldInfo} 切换到了 ${newInfo}`)
    if (newInfo?.address) {
      await getMyClaims()
    } else {
      router.push("/")
    }
  },
  { immediate: false }
)


const formateDate = (datetime) => {
  return dayjs(datetime).format('YYYY-MM-DD HH:mm')
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

// 获取我的订单
const typeSel = ref("all")
const myClaims = ref([])
const getMyClaims = async () => {
  let type = typeSel.value
  const address = accountInfo.value.address
  if (address) {
    await fetch(`${WEBUI_BASE_URL}/api/claims/address/${address}/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          myClaims.value = data.data
        }
      }
    }).catch((err) => {
      console.log("===========err============", err);
    });
  }
}
const getTypeMyClaims = async (type) => {
  typeSel.value = type
  await getMyClaims()
}

// 打开详情模态（示例数据
const selPolicy = ref({})
const insTitle = ref('')
const openDetailModal = (policy) => {
  selPolicy.value = policy
  let currentLang = locale.value
  insTitle.value = currentLang === 'en' ? policy.title_en : policy.title_zh
  document.getElementById('detailModal').style.display = 'flex';
}
// 关闭详情模态
const closeDetailModal = () => {
  document.getElementById('detailModal').style.display = 'none';
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
  overflow-x: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark);
}

.filters {
  display: flex;
  gap: 10px;
}

.filter-btn {
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  color: #000;
}

.filter-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

tr:hover {
  background-color: #f8f9fa;
}

.detail-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

.detail-content {
  background: white;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.status-fully-paid {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}
.status-fully-paid2 {
  color: #27ae60;
}

.status-pending {
  background: rgba(243, 156, 18, 0.15);
  color: #e67e22;
}
.status-pending2 {
  color: #e67e22;
}

.status-partial {
  background: rgba(155, 89, 182, 0.15);
  color: #8e44ad;
}
.status-partial2 {
  color: #8e44ad;
}

.status-rejected {
  background: rgba(231, 76, 60, 0.15);
  color: #c0392b;
}
.status-rejected2 {
  color: #c0392b;
}


.btn-primary {
  background: var(--primary);
  color: white;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  white-space: nowrap;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  line-height: 1px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: var(--gray);
}

.form-group {
  color: #333;
  line-height: 1.6;
  font-size: 14px;
  margin-bottom: 30px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-group p {
  line-height: 2px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.payment-stages {
  display: flex;
  gap: 15px;
  margin: 15px 0;
}

.payment-stage {
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
  text-align: center;
}

.payment-stage.active {
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid #2ecc71;
}

.stage-amount {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
}

.stage-status {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;
}

.status-paid {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.payment-timeline {
  margin: 20px 0;
  padding-left: 20px;
  border-left: 2px solid #3498db;
}

.timeline-item {
  margin-bottom: 15px;
  position: relative;
}

.timeline-item:before {
  content: '';
  position: absolute;
  left: -25px;
  top: 7px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3498db;
}

.timeline-date {
  font-size: 12px;
  color: #6c757d;
}

.timeline-content {
  margin-top: 5px;
}

.nodata {
  line-height: 100px;
  text-align: center;
  color: #888888;
}
</style>