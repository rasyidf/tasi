<template>
  <el-container class="main-container">
    <el-header class="main-header">
      <Navbar />
    </el-header>
    <el-container>
      <el-main class="main-item"> <Nuxt /></el-main>
      <el-footer class="main-footer">
        <span> Copyright &copy; 2021, UNPAK</span>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
.main-header {
  padding: 0;
}
.main-item {
  min-height: calc(100vh - 120px);
}
.main-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: teal;
  text-align: center;
  color: white;
}
.main-container {
  background-color: #dbdbdb imp !important;
}
.el-main {
  padding: 8px;
}
</style>
