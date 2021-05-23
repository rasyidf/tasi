<template>
  <el-container>
    <el-header>
      <Navbar />
    </el-header>
    <el-container>
      <el-main> <Nuxt /></el-main>
      <el-footer><span> Copyright &copy; 2021, UNPAK</span></el-footer>
    </el-container>
  </el-container>
</template>

<style>
html {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.el-header {
  padding: 0;
}
.el-main {
  min-height: calc(100vh - 160px);
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: teal;
  text-align: center;
  color: white;
}
</style>
