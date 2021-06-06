<template>
  <div class="container">
    <el-page-header :content="ChildName" @back="goBack"> </el-page-header>

    <NuxtChild />
  </div>
</template>

<script>
export default {
  layout: 'default',
  computed: {
    ChildName() {
      switch (this.$route.name) {
        case 'report-audit_supplier':
          return 'Laporan Supplier'
        case 'report-audit_user':
          return 'Laporan User'
        case 'report-items':
          return 'Laporan Produk'
        case 'report-manufacture':
          return 'Laporan Manufaktur'
        case 'report-stocks':
          return 'Laporan Stok'
        default:
          return this.$route.name
      }
    },
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/',
      })
    },
  },
}
</script>

<style>
.main_content {
  padding: 0;
  height: calc(100vh - 216px);
  display: flex;
  align-content: center;
  justify-content: center;
  background: url('/empty.png') no-repeat center;
}
</style>
