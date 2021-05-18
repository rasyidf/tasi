<template>
  <div class="container">
    <el-page-header :content="ChildName" @back="goBack"> </el-page-header>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  computed: {
    ChildName() {
      switch (this.$route.name) {
        case 'data-items':
          return 'Items'
        case 'data-suppliers':
          return 'Suppliers'
        case 'data-users':
          return 'Users'
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
