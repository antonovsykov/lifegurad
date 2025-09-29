<template>
  <div class="continer">
    <div class="blog-info">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed :prop="locale=='zh' ? 'title_zh' : 'title_en'" :label="t('insname')" width="300" />
        <el-table-column prop="wallet_adr" :label="t('walletaddress')" width="300" />
        <el-table-column prop="duration" :label="t('insduration')" width="100" align="center"/>
        <el-table-column prop="share" :label="t('insshare')" width="100" align="center"/>
        <el-table-column prop="total" :label="t('totalamount')" width="200" align="center"/>
        <el-table-column prop="hash" :label="t('tranhash')" width="300" align="center"/>
        <el-table-column :label="t('starttime')" width="200" align="center">
          <template #default="scope">
            <span type="text">{{ formateDate(scope.start_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="t('endtime')" width="200" align="center">
          <template #default="scope">
            <span type="text">{{ formateDate(scope.end_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" :label="t('email')" width="200" align="center"/>
        <el-table-column fixed="right" :label="t('operations')" width="220" align="center">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleSendEmail(scope.row)">{{ t('resendemail') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
        :current-page="currentPage" @current-change="handlePageChange" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();

import { WEBUI_BASE_URL } from '../../api/constants'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs';

const tableData = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const handlePageChange = async (newPage) => {
  currentPage.value = newPage
  await getPolicys()
}
const getPolicys = async () => {
  const params = new URLSearchParams()
  params.append('page', currentPage.value)
  params.append('limit', pageSize.value)
  await fetch(`${WEBUI_BASE_URL}/api/orders?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        tableData.value = data.data
        total.value = data.count
      }
    }
  }).catch((err) => {
    console.log("===========err============", err);
  });
}

onMounted(async () => {
  await getPolicys()
})

const formateDate = (datetime) => {
  return dayjs(datetime).format('YYYY-MM-DD')
}


const handleSendEmail = async (row) => {
  await fetch(`${WEBUI_BASE_URL}/api/orders/resendemail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: row.id})
  }).then(async (res) => {
    if (res.ok) {
      ElMessage.success(t('resendsuccess'))
    }
  }).catch((err) => {
    console.log("===========err============", err);
    ElMessage.error(t('resendfailed'))
  });
}
</script>

<style scoped>
.continer {
  display: flex;
  flex-direction: column;
  width: calc(100% - 260px);
  height: calc(100vh - 228px);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.pagination {
  display: flex;
  margin-top: 10px;
  justify-content: end;
}
</style>