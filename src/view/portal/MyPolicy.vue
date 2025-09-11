<template>
  <div class="container">
    <h1>{{ t('mypplicy') }}</h1>
    <p class="subtitle">{{ t('managemypolicies') }}</p>

    <div class="card">
      <div class="card-header">
        <div class="card-title">{{ t('allpolicies') }}</div>
        <div class="filters">
          <button :class="['filter-btn', typeSel === 'all' ? 'active' : '']" data-filter="all"
            @click="getTypeMyOrders('all')">{{ t('all') }}</button>
          <button :class="['filter-btn', typeSel === 'valid' ? 'active' : '']" data-filter="valid"
            @click="getTypeMyOrders('valid')">{{ t('valid') }}</button>
          <button :class="['filter-btn', typeSel === 'expiring' ? 'active' : '']" data-filter="expiring"
            @click="getTypeMyOrders('expiring')">{{ t('expiring') }}</button>
        </div>
      </div>

      <div class="policy-list">
        <template v-if="myOrders.length > 0">
          <div :class="['policy-item', isMobile ? 'policy-col' : 'policy-row']" v-for="(item, index) in myOrders"
            :key="index">
            <img :class="[isMobile ? 'policy-img2' : 'policy-img']" :src="item.bgimg" />
            <div class="policy-info">
              <div class="policy-details">
                <div class="policy-title">
                  <h3 :data-en="item.title_en" :data-zh="item.title_zh">{{ item.title_en }}</h3>
                  <template v-if="item.status == 1">
                    <span v-if="isMobile" class="status-badge status-pending">{{ t('underreview') }}</span>
                  </template>
                  <template v-else-if="item.status == 2">
                    <span v-if="isMobile" class="status-badge status-paid">{{ t('effective') }}</span>
                  </template>
                  <template v-else>
                    <span v-if="isMobile" class="status-badge status-available">{{ t('notapplied') }}</span>
                  </template>
                </div>
                <p :data-en="item.brief_en" :data-zh="item.brief_zh">{{ item.brief_en }}</p>
                <p>{{ t('valid') }}: {{ item.duration }} {{ t('month') }} • {{ t('expire') }}: {{
                  formateDate(item.end_time) }}</p>
              </div>
            </div>
            <div class="policy-status">
              <template v-if="item.status == 1">
                <span v-if="!isMobile" class="status-badge status-pending">{{ t('underreview') }}</span>
                <button class="action-btn btn-disabled" disabled>{{ t('inprogress') }}</button>
              </template>
              <template v-else-if="item.status == 2">
                <span v-if="!isMobile" class="status-badge status-paid">{{ t('effective') }}</span>
                <button class="action-btn btn-disabled" disabled>{{ t('processed') }}</button>
              </template>
              <template v-else>
                <span v-if="!isMobile" class="status-badge status-available">{{ t('notapplied') }}</span>
                <button class="action-btn btn-primary" @click="openClaimModal(item)">{{ t('fileclaim') }}</button>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="nodata">{{ t('nodata') }}</div>
        </template>
      </div>
    </div>

    <div class="modal" id="claimModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ t('fileclaim') }}</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <form id="claimForm">
          <div class="form-group">
            <label>{{ t('insurancetype') }}</label>
            <input type="text" :value="insTitle" readonly>
          </div>

          <div class="form-group">
            <label>{{ t('policevalidityperiod') }}</label>
            <select id="policyDuration" required>
              <option value="">{{ t('select') }}</option>
              <option value="1">1 {{ t('month') }}</option>
              <option value="3">3 {{ t('month') }}</option>
              <option value="6">6 {{ t('month') }}</option>
              <option value="12">12 {{ t('month') }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>{{ t('claimamount') }}（LGUARD）</label>
            <input type="number" id="claimAmount" :placeholder="t('enterclaimamount')" required>
          </div>

          <div class="form-group">
            <label>{{ t('claimreason') }}</label>
            <textarea id="claimReason" v-model="claimModel.reasion"
              :placeholder="t('pleaseprovideadetaileddescriptionofclaimreason')" required></textarea>
          </div>

          <div class="form-group">
            <label>{{ t('uploadsupportingdocuments') }}</label>
            <el-upload class="upload-demo" drag :action="`${WEBUI_BASE_URL}/api/upload/single`" multiple
              :file-list="selectedFiles" @change="handleFileChange" @remove="handleRemove">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">{{ t('clickordropuploadfile') }}</div>
            </el-upload>
          </div>

          <button type="submit" class="submit-btn" @click="submitApplic">{{ t('submitapplication') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { WEBUI_BASE_URL } from '../../api/constants'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs';
import { useAppKitAccount } from "@reown/appkit/vue";
const accountInfo = useAppKitAccount();

// 定义切换语言的函数
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();

onMounted(async () => {
  window.addEventListener('resize', checkScreenSize)
  await getMyOrders()
  checkDomLang()
})

watch(
  locale, (newLocale, oldLocale) => {
    console.log(`语言从 ${oldLocale} 切换到了 ${newLocale}`)
    checkDomLang()
  },
  { immediate: false } // 可选：是否在初始化时立即执行一次
)

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
}

// 获取我的订单
const typeSel = ref("all")
const myOrders = ref([])
const getMyOrders = async () => {
  let type = typeSel.value
  const address = accountInfo.value.address
  if (address) {
    await fetch(`${WEBUI_BASE_URL}/api/orders/address/${address}/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          myOrders.value = data.data
        }
      }
    }).catch((err) => {
      console.log("===========err============", err);
    });
  }
}
const getTypeMyOrders = async (type) => {
  typeSel.value = type
  await getMyOrders()
}

const formateDate = (datetime) => {
  return dayjs(datetime).format('YYYY-MM-DD')
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

// 打开理赔模态
const selPolicy = ref()
const insTitle = ref('')
const selectedFiles = ref([])
const claimModel = ref({
  order_id: "",
  reasion: "",
  files: []
})
const openClaimModal = (policy) => {
  selectedFiles.value = []
  selPolicy.value = policy
  let currentLang = locale.value
  insTitle.value = currentLang === 'en' ? policy.title_en : policy.title_zh
  document.getElementById('claimModal').style.display = 'flex'
  claimModel.value.reasion = ""
  claimModel.value.files = []
  claimModel.value.order_id = policy.id
}
// 关闭模态
const closeModal = () => {
  document.getElementById('claimModal').style.display = 'none';
  document.getElementById('claimForm').reset();
}
const handleFileChange = (file, fileList) => {
  claimModel.value.files = []
  fileList.forEach(item => {
    if (item.status == 'success') {
      claimModel.value.files.push(item.response.file.filename)
    }
  })
}
const handleRemove = (file, fileList) => {
  claimModel.value.files = []
  fileList.forEach(item => {
    if (item.status == 'success') {
      claimModel.value.files.push(item.response.file.filename)
    }
  })
}
const submitApplic = async () => {
  await fetch(`${WEBUI_BASE_URL}/api/claims`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(claimModel.value)
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        ElMessage.success(t('applysuccess'))
        await getMyOrders()
        closeModal()
      } else {
        ElMessage.error(t('applyfailed'))
      }
    } else {
      ElMessage.error(t('applyfailed'))
    }
  }).catch((err) => {
    console.log("=======payerr=====", err)
    ElMessage.error(t('applyfailed'))
  });
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
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

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark);
}

.close-btn {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: var(--gray);
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

.policy-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.policy-item {
  display: flex;
  padding: 20px;
  border-radius: 10px;
  background: var(--light);
  transition: all 0.3s;
}

.policy-row {
  align-items: center;
  justify-content: space-between;
}

.policy-col {
  flex-direction: column;
}

.policy-img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 15px;
}

.policy-img2 {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
}

.policy-info {
  flex: 1;
  display: flex;
  align-items: center;
}

.policy-details {
  width: 100%;
}

.policy-details h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.policy-title {
  display: flex;
  justify-content: space-between;
}

.policy-details p {
  font-size: 14px;
  color: var(--gray);
}

.policy-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 120px;
  gap: 8px;
}

.policy-status {
  display: flex;
  justify-content: space-between;
  min-width: 120px;
}

.status-paid {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.status-pending {
  background: rgba(243, 156, 18, 0.15);
  color: #e67e22;
}

.status-available {
  background: rgba(52, 152, 219, 0.15);
  color: #2980b9;
}

.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  height: 16px;
  white-space: nowrap;
  margin-top: 16px;
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
}

.modal {
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

.modal-content {
  background: white;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.file-upload {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.file-upload:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #2980b9;
}

.nodata {
  line-height: 100px;
  text-align: center;
  color: #888888;
}
</style>