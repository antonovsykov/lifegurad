<template>
  <div class="container">
    <h1>账户余额</h1>
    <p class="subtitle">管理您的资金和交易</p>
    <div class="card">
      <div class="card-header">
        <div class="card-title">钱包信息</div>
      </div>
      <p>账户余额页面内容</p>
    </div>
  </div>
</template>

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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
</style>