<template>
  <footer>
    <div class="wrap">
      <div class="logo-wrap">
        <img src="@/assets/logo.png" alt="Lifeguard Logo" />
        <h3>Lifeguard</h3>
      </div>
      <div class="thrd-link">
        <a href="https://x.com/LifeGuard2030" target="_blank">Twitter</a>
        <a href="https://medium.com/@471037624" target="_blank">Medium</a>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
* {
  box-sizing: border-box
}
footer {
  background: #353535;
  color: #fff;
  padding: 20px 16px;
  position: relative;
}
footer .wrap {
  max-width: 1200px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px
}
footer .logo-wrap {
  display: flex;
  align-items: center;
  gap: 10px
}

footer .logo-wrap img {
  width: 30px;
  height: 30px;
  object-fit: contain;
  border-radius: 8px
}

.thrd-link {
  display: flex;
  gap: 20px;
}

.thrd-link a {
  color: #FFFFFF;
  font-weight: bold;
  text-decoration: none;
}
</style>