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
        case 'manage-items':
          return 'Produk'
        case 'manage-suppliers':
          return 'Supplier'
        case 'manage-users':
          return 'Pengguna'
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
.el-card__body {
  padding: 0;
}
</style>
