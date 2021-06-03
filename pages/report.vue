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
          return 'Audit Supplier'
        case 'report-audit_user':
          return 'Audit User'
        case 'report-items':
          return 'Items Reports'
        case 'report-manufacture':
          return 'Manufaktur'
        case 'report-stocks':
          return 'Stok Barang'
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
