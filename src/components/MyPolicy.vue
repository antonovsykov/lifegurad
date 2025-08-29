<template>
  <div class="container">
    <h1>我的保单</h1>
    <p class="subtitle">管理您的所有保险保单</p>

    <div class="card">
      <div class="card-header">
        <div class="card-title">所有保单</div>
        <div class="filters">
          <button class="filter-btn active" data-filter="all">全部</button>
          <button class="filter-btn" data-filter="valid">有效</button>
          <button class="filter-btn" data-filter="expiring">即将到期</button>
        </div>
      </div>

      <div class="policy-list">
        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon health">
              <i class="fas fa-heartbeat"></i>
            </div>
            <div class="policy-details">
              <h3>感冒医疗险</h3>
              <p>保障您的健康 • 有效期: 12个月 • 截止: 2024-06-15</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-paid">已生效</span>
            <button class="action-btn btn-primary" @click="openClaimModal('感冒医疗险')">申请理赔</button>
          </div>
        </div>

        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon pension">
              <i class="fas fa-piggy-bank"></i>
            </div>
            <div class="policy-details">
              <h3>养老金万能险</h3>
              <p>保障您的退休生活 • 有效期: 12个月 • 截止: 2024-08-20</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-paid">已生效</span>
            <button class="action-btn btn-primary" @click="openClaimModal('养老金万能险')">申请理赔</button>
          </div>
        </div>

        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon flight">
              <i class="fas fa-plane"></i>
            </div>
            <div class="policy-details">
              <h3>航班延误险</h3>
              <p>保障您的航班延误损失 • 有效期: 3个月 • 截止: 2023-12-31</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-pending">审核中</span>
            <button class="action-btn btn-disabled" disabled>处理中</button>
          </div>
        </div>

        <div class="policy-item" data-status="expiring">
          <div class="policy-info">
            <div class="policy-icon sports">
              <i class="fas fa-walking"></i>
            </div>
            <div class="policy-details">
              <h3>运动步数激励险</h3>
              <p>激励您每日运动 • 有效期: 1个月 • 截止: 2023-11-15</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-expiring">即将到期</span>
            <button class="action-btn btn-primary" @click="openClaimModal('运动步数激励险')">申请理赔</button>
          </div>
        </div>

        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon delivery">
              <i class="fas fa-utensils"></i>
            </div>
            <div class="policy-details">
              <h3>外卖延误险</h3>
              <p>保障您的外卖体验 • 有效期: 6个月 • 截止: 2024-03-10</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-available">未申请</span>
            <button class="action-btn btn-primary" @click="openClaimModal('外卖延误险')">申请理赔</button>
          </div>
        </div>

        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon digital">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="policy-details">
              <h3>手机碎屏电池衰减险</h3>
              <p>保障您的手机设备 • 有效期: 12个月 • 截止: 2024-05-20</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-available">未申请</span>
            <button class="action-btn btn-primary" @click="openClaimModal('手机碎屏电池衰减险')">申请理赔</button>
          </div>
        </div>

        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon delivery">
              <i class="fas fa-shipping-fast"></i>
            </div>
            <div class="policy-details">
              <h3>快递超时延误险</h3>
              <p>保障您的快递体验 • 有效期: 6个月 • 截止: 2024-02-28</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-available">未申请</span>
            <button class="action-btn btn-primary" @click="openClaimModal('快递超时延误险')">申请理赔</button>
          </div>
        </div>

        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon streaming">
              <i class="fas fa-tv"></i>
            </div>
            <div class="policy-details">
              <h3>视频音乐会员险</h3>
              <p>保障您的会员权益 • 有效期: 3个月 • 截止: 2024-01-15</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-available">未申请</span>
            <button class="action-btn btn-primary" @click="openClaimModal('视频音乐会员险')">申请理赔</button>
          </div>
        </div>

        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon game">
              <i class="fas fa-gamepad"></i>
            </div>
            <div class="policy-details">
              <h3>游戏段位掉分险</h3>
              <p>保障您的游戏体验 • 有效期: 1个月 • 截止: 2023-11-30</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-available">未申请</span>
            <button class="action-btn btn-primary" @click="openClaimModal('游戏段位掉分险')">申请理赔</button>
          </div>
        </div>

        <div class="policy-item" data-status="valid">
          <div class="policy-info">
            <div class="policy-icon dating">
              <i class="fas fa-heart"></i>
            </div>
            <div class="policy-details">
              <h3>约会失败险</h3>
              <p>保障您的约会体验 • 有效期: 3个月 • 截止: 2024-01-05</p>
            </div>
          </div>
          <div class="policy-status">
            <span class="status-badge status-available">未申请</span>
            <button class="action-btn btn-primary" @click="openClaimModal('约会失败险')">申请理赔</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="claimModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>申请理赔</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <form id="claimForm">
          <div class="form-group">
            <label>保险类型</label>
            <input type="text" id="policyType" readonly>
          </div>

          <div class="form-group">
            <label>保单有效期（月）</label>
            <select id="policyDuration" required>
              <option value="">请选择</option>
              <option value="1">1个月</option>
              <option value="3">3个月</option>
              <option value="6">6个月</option>
              <option value="12">12个月</option>
            </select>
          </div>

          <div class="form-group">
            <label>索赔金额（LGUARD）</label>
            <input type="number" id="claimAmount" placeholder="输入索赔金额" required>
          </div>

          <div class="form-group">
            <label>索赔原因</label>
            <textarea id="claimReason" placeholder="详细描述您的索赔原因" required></textarea>
          </div>

          <div class="form-group">
            <label>上传证明材料</label>
            <div class="file-upload" @click="document.getElementById('fileInput').click()">
              <i class="fas fa-cloud-upload-alt" style="font-size: 24px; margin-bottom: 10px;"></i>
              <p>点击上传文件或拖拽至此</p>
              <input type="file" id="fileInput" multiple style="display: none;">
            </div>
          </div>

          <button type="submit" class="submit-btn">提交申请</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// 打开理赔模态
const openClaimModal = (policy) => {
  document.getElementById('policyType').value = policy;
  document.getElementById('claimModal').style.display = 'flex';
}

// 关闭模态
const closeModal = () => {
  document.getElementById('claimModal').style.display = 'none';
  document.getElementById('claimForm').reset();
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
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: var(--light);
  transition: all 0.3s;
}

.policy-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.policy-details h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.policy-details p {
  font-size: 14px;
  color: var(--gray);
}

.policy-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
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
</style>