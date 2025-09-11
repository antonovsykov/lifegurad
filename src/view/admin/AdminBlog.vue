<template>
  <div class="continer">
    <div class="tool-top">
      <el-button type="primary" @click="handleAdd">{{ t('add') }}</el-button>
      <div class="tool-search">
        <el-input :placeholder="t('pleaseentercontent')" v-model="input3">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>

    <div class="blog-info">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="title" :label="t('blogtitle')" width="300" />
        <el-table-column prop="picture" :label="t('blogimg')" width="200">
          <template #default="scope">
            <el-image fit="cover" class="table-img" :src="`${WEBUI_BASE_URL}/uploads/${scope.row.picture}`" />
          </template>
        </el-table-column>
        <el-table-column class="long-text" prop="description" :label="t('blogdesc')" min-width="300" />
        <el-table-column prop="status" :label="t('blogrelease')" width="100" align="center">
          <template #default="scope">
            <label style="color: gray;" v-if="scope.row.status == 0">{{ t('no') }}</label>
            <label style="color: green;" v-if="scope.row.status == 1">{{ t('yes') }}</label>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="t('operations')" width="220" align="center">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleView(scope.row)">{{ t('view') }}</el-button>
            <el-button type="text" size="small" @click="handleUpdate(scope.row)">{{ t('edit') }}</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">{{ t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
        :current-page="currentPage" @current-change="handlePageChange" />
    </div>

    <!-- 添加博客 -->
    <el-drawer :title="t('addblog')" v-model="addDrawer" size="50%">
      <div class="add-form">
        <div class="add-group">
          <label class="add-tip">{{ t('blogtitle') }}</label>
          <el-input v-model="addForm.title" :rows="2" type="textarea" :placeholder="t('pleaseentercontent')" />
        </div>
        <div class="add-group">
          <label class="add-tip">{{ t('blogdesc') }}</label>
          <el-input v-model="addForm.description" :rows="2" type="textarea" :placeholder="t('pleaseentercontent')" />
        </div>
        <div class="add-group">
          <label class="add-tip">{{ t('blogimg') }}</label>
          <el-upload class="cover-uploader" :action="`${WEBUI_BASE_URL}/api/upload/single`" :show-file-list="false"
            :on-success="handleCoverSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="cover-image" />
            <el-icon v-else class="cover-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>
        <div class="add-group">
          <label class="add-tip">{{ t('blogalt') }}</label>
          <el-input v-model="addForm.pic_alt" :rows="2" type="textarea" :placeholder="t('pleaseentercontent')" />
        </div>
        <div class="add-group">
          <label class="add-tip">{{ t('blogcontent') }}</label>
          <el-input v-model="addForm.content" :rows="8" type="textarea" :placeholder="t('pleaseentercontent')" />
        </div>
        <div class="add-group">
          <div class="add-status">
            <label class="add-tip">{{ t('blogrelease') }}</label>
            <div class="status-info">
              <el-radio v-model="addForm.status" :label="0" size="large">{{ t('no') }}</el-radio>
              <el-radio v-model="addForm.status" :label="1" size="large">{{ t('yes') }}</el-radio>
            </div>
          </div>
        </div>
        <div class="add-opt">
          <el-button @click="handleAddCancle">取消</el-button>
          <el-button type="primary" @click="handleAddCreate">确认</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- 修改博客 -->
    <el-drawer :title="t('addblog')" v-model="updateDrawer" size="50%">
      <div class="add-form">
        <div class="add-group">
          <label class="add-tip">{{ t('blogtitle') }}</label>
          <el-input v-model="updateForm.title" :rows="2" type="textarea" :placeholder="t('pleaseentercontent')" />
        </div>
        <div class="add-group">
          <label class="add-tip">{{ t('blogdesc') }}</label>
          <el-input v-model="updateForm.description" :rows="2" type="textarea" :placeholder="t('pleaseentercontent')" />
        </div>
        <div class="add-group">
          <label class="add-tip">{{ t('blogimg') }}</label>
          <el-upload class="cover-uploader" :action="`${WEBUI_BASE_URL}/api/upload/single`" :show-file-list="false"
            :on-success="handleCoverUpdateSuccess">
            <img v-if="editImageUrl" :src="editImageUrl" class="cover-image" />
            <el-icon v-else class="cover-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>
        <div class="add-group">
          <label class="add-tip">{{ t('blogalt') }}</label>
          <el-input v-model="updateForm.pic_alt" :rows="2" type="textarea" :placeholder="t('pleaseentercontent')" />
        </div>
        <div class="add-group">
          <label class="add-tip">{{ t('blogcontent') }}</label>
          <el-input v-model="updateForm.content" :rows="8" type="textarea" :placeholder="t('pleaseentercontent')" />
        </div>
        <div class="add-group">
          <div class="add-status">
            <label class="add-tip">{{ t('blogrelease') }}</label>
            <div class="status-info">
              <el-radio v-model="updateForm.status" :label="0" size="large">{{ t('no') }}</el-radio>
              <el-radio v-model="updateForm.status" :label="1" size="large">{{ t('yes') }}</el-radio>
            </div>
          </div>
        </div>
        <div class="add-opt">
          <el-button @click="handleUpdateCancle">取消</el-button>
          <el-button type="primary" @click="handleUpdateCreate">确认</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { WEBUI_BASE_URL } from '../../api/constants'

import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const addDrawer = ref(false)
const addForm = ref({
  title: '',
  description: '',
  picture: '',
  pic_alt: '',
  content: '',
  status: 0
})
const imageUrl = ref("")
const handleAdd = () => {
  addDrawer.value = true;
}
const handleCoverSuccess = (response, uploadFile) => {
  if (response.success) {
    addForm.value.picture = response.file.filename
  }
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}
const handleAddCreate = async () => {
  await fetch(`${WEBUI_BASE_URL}/api/blog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addForm.value)
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        ElMessage.success(t('createsuccess'))
        handleAddCancle()
        await getBlogs()
      } else {
        ElMessage.error(t('createfailed'))
      }
    } else {
      ElMessage.error(t('createfailed'))
    }
  }).catch((err) => {
    console.log("=======payerr=====", err)
    ElMessage.error(t('createfailed'))
  });
}
const handleAddCancle = () => {
  addForm.value.title = ''
  addForm.value.description = ''
  addForm.value.picture = ''
  addForm.value.pic_alt = ''
  addForm.value.content = ''
  addForm.value.status = 0
  imageUrl.value = ''
  addDrawer.value = false
}

const updateDrawer = ref(false)
const updateForm = ref({})
const editImageUrl = ref("")
const handleUpdate = (row) => {
  updateForm.value = row
  editImageUrl.value = `${WEBUI_BASE_URL}/uploads/${row.picture}`
  updateDrawer.value = true
}
const handleCoverUpdateSuccess = (response, uploadFile) => {
  if (response.success) {
    updateForm.value.picture = response.file.filename
  }
  editImageUrl.value = URL.createObjectURL(uploadFile.raw)
}
const handleUpdateCreate = async () => {
  await fetch(`${WEBUI_BASE_URL}/api/blog`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateForm.value)
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        ElMessage.success(t('updatesuccess'))
        handleUpdateCancle()
        await getBlogs()
      } else {
        ElMessage.error(t('updatefailed'))
      }
    } else {
      ElMessage.error(t('updatefailed'))
    }
  }).catch((err) => {
    console.log("=======payerr=====", err)
    ElMessage.error(t('updatefailed'))
  });
}
const handleUpdateCancle = () => {
  updateForm.value = {}
  updateDrawer.value = false
}

const tableData = ref([])
const total = ref(0)
const pageSize = ref(5)
const currentPage = ref(1)
const handlePageChange = async (newPage) => {
  currentPage.value = newPage
  await getBlogs()
}
const getBlogs = async () => {
  const params = new URLSearchParams()
  params.append('page', currentPage.value)
  params.append('limit', pageSize.value)
  await fetch(`${WEBUI_BASE_URL}/api/blog?${params.toString()}`, {
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

const handleView = (row) => {
  window.open(`/blog/${row.id}`, '_blank')
}

const handleDelete = async (row) => {
  await fetch(`${WEBUI_BASE_URL}/api/blog`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: row.id })
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        ElMessage.success(t('deletesuccess'))
        await getBlogs()
      } else {
        ElMessage.error(t('deletefailed'))
      }
    } else {
      ElMessage.error(t('deletefailed'))
    }
  })
}

onMounted(async () => {
  await getBlogs()
})
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

.tool-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.tool-search {
  width: 300px;
}

.blog-info {
  display: flex;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
}

.table-img {
  width: 200px;
  height: 100px;
}

.pagination {
  display: flex;
  margin-top: 10px;
  justify-content: end;
}

::v-deep .el-drawer__body {
  border-top: 1px solid #adadad !important;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

::v-deep .cover-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 300px;
  height: 200px;
}

.cover-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .cover-image {
  width: 300px;
  height: 200px;
}

.el-icon.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.add-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.add-tip {
  font-size: 14px;
  color: #505050;
  font-weight: bold;
}

.add-status {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.add-status {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.status-info {
  margin-left: 15px;
}

.add-opt {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}

::v-deep .el-table .cell {
  max-width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  /* 限制为三行 */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
}
</style>