<template>
  <div class="container">
    <el-page-header class="no-print" :content="ChildName" @back="goBack">
    </el-page-header>

    <NuxtChild />
  </div>
</template>

<script>
export default {
  layout: 'default',
  computed: {
    ChildName() {
      switch (this.$route.name) {
        case 'ops-orders':
          return 'Pesanan'
        case 'ops-manufacture':
          return 'Manufaktur'
        case 'ops-orders-add':
          return 'Pesanan Baru'
        case 'ops-manufacture-add':
          return 'Ajukan Manufaktur'
        case 'ops-orders-id':
          return 'Detail Pesanan'
        case 'ops-manufacture-id':
          return 'Detail Manufaktur'
        default:
          return this.$route.name
      }
    },
  },
  methods: {
    goBack() {
      switch (this.$route.name) {
        case 'ops-orders-add':
        case 'ops-orders-id':
          this.$router.push({
            path: '/ops/orders',
          })
          break
        case 'ops-manufacture-add':
        case 'ops-manufacture-id':
          this.$router.push({
            path: '/ops/manufacture',
          })
          break
        default:
          this.$router.push({
            path: '/',
          })
          break
      }
    },
  },
}
</script>
