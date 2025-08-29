<template>
  <div class="container">
    <h1>理赔申请</h1>
    <p class="subtitle">提交和管理您的理赔申请</p>

    <div class="card">
      <div class="card-header">
        <div class="card-title">理赔历史</div>
        <div class="filters">
          <button class="filter-btn active" data-claim-filter="all">全部</button>
          <button class="filter-btn" data-claim-filter="pending">待处理</button>
          <button class="filter-btn" data-claim-filter="approved">已通过</button>
          <button class="filter-btn" data-claim-filter="partial">分期支付</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>保单类型</th>
            <th>提交时间</th>
            <th>保单有效期</th>
            <th>1期赔付金额</th>
            <th>2期赔付金额</th>
            <th>总金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr data-claim-status="approved">
            <td>感冒医疗险</td>
            <td>2023-10-15 14:30</td>
            <td>12个月</td>
            <td>2,500 LGUARD</td>
            <td>2,500 LGUARD</td>
            <td>5,000 LGUARD</td>
            <td><span class="status-badge status-fully-paid">全部支付</span></td>
            <td><button class="action-btn btn-primary" @click="openDetailModal('感冒医疗险')">查看详情</button></td>
          </tr>
          <tr data-claim-status="pending">
            <td>航班延误险</td>
            <td>2023-10-18 09:15</td>
            <td>3个月</td>
            <td>-</td>
            <td>-</td>
            <td>2,500 LGUARD</td>
            <td><span class="status-badge status-pending">审核中</span></td>
            <td><button class="action-btn btn-primary" @click="openDetailModal('航班延误险')">查看详情</button></td>
          </tr>
          <tr data-claim-status="approved">
            <td>手机碎屏电池衰减险</td>
            <td>2023-09-05 16:45</td>
            <td>12个月</td>
            <td>8,000 LGUARD</td>
            <td>-</td>
            <td>8,000 LGUARD</td>
            <td><span class="status-badge status-partial">1期已支付</span></td>
            <td><button class="action-btn btn-primary" @click="openDetailModal('手机碎屏电池衰减险')">查看详情</button></td>
          </tr>
          <tr data-claim-status="approved">
            <td>外卖延误险</td>
            <td>2023-08-22 19:30</td>
            <td>6个月</td>
            <td>-</td>
            <td>-</td>
            <td>3,000 LGUARD</td>
            <td><span class="status-badge status-rejected">已拒绝</span></td>
            <td><button class="action-btn btn-primary" @click="openDetailModal('外卖延误险')">查看详情</button></td>
          </tr>
          <tr data-claim-status="approved" data-claim-payment="partial">
            <td>运动步数激励险</td>
            <td>2023-11-01 10:20</td>
            <td>1个月</td>
            <td>1,500 LGUARD</td>
            <td>1,500 LGUARD</td>
            <td>3,000 LGUARD</td>
            <td><span class="status-badge status-partial">1期已支付</span></td>
            <td><button class="action-btn btn-primary" @click="openDetailModal('运动步数激励险')">查看详情</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="detail-modal" id="detailModal">
      <div class="detail-content">
        <div class="modal-header">
          <h2>理赔详情</h2>
          <button class="close-btn" @click="closeDetailModal">&times;</button>
        </div>
        <div class="detail-body">
          <div class="form-group">
            <label>保单类型</label>
            <p id="detailPolicyType"></p>
          </div>

          <div class="form-group">
            <label>提交时间</label>
            <p id="detailSubmitTime"></p>
          </div>

          <div class="form-group">
            <label>总赔付金额</label>
            <p id="detailTotalAmount"></p>
          </div>

          <div class="form-group">
            <label>当前状态</label>
            <p id="detailStatus"></p>
          </div>

          <div class="payment-stages">
            <div class="payment-stage" id="stage1">
              <div class="stage-label">第一期</div>
              <div class="stage-amount" id="stage1Amount"></div>
              <span class="stage-status status-badge" id="stage1Status"></span>
            </div>
            <div class="payment-stage" id="stage2">
              <div class="stage-label">第二期</div>
              <div class="stage-amount" id="stage2Amount"></div>
              <span class="stage-status status-badge" id="stage2Status"></span>
            </div>
          </div>

          <div class="payment-timeline">
            <div class="timeline-item">
              <div class="timeline-date">2023-10-15 14:30</div>
              <div class="timeline-content">理赔申请提交</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2023-10-16 09:00</div>
              <div class="timeline-content">审核通过，第一期支付完成</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2023-11-16 09:00</div>
              <div class="timeline-content">第二期支付完成</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 打开详情模态（示例数据）
const openDetailModal = (policy) => {
  // 这里可以根据policy获取实际数据，这里用示例
  document.getElementById('detailPolicyType').textContent = policy;
  document.getElementById('detailSubmitTime').textContent = '2023-10-15 14:30';
  document.getElementById('detailTotalAmount').textContent = '5,000 LGUARD';
  document.getElementById('detailStatus').textContent = '全部支付';

  document.getElementById('stage1Amount').textContent = '2,500 LGUARD';
  document.getElementById('stage1Status').textContent = '已支付';
  document.getElementById('stage1Status').classList.add('status-paid');

  document.getElementById('stage2Amount').textContent = '2,500 LGUARD';
  document.getElementById('stage2Status').textContent = '已支付';
  document.getElementById('stage2Status').classList.add('status-paid');

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
  width: 600px;
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
}

.status-fully-paid {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.status-pending {
  background: rgba(243, 156, 18, 0.15);
  color: #e67e22;
}

.status-partial {
  background: rgba(155, 89, 182, 0.15);
  color: #8e44ad;
}

.status-rejected {
  background: rgba(231, 76, 60, 0.15);
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
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: var(--gray);
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
</style>