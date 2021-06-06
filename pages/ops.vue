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
        default:
          return this.$route.name
      }
    },
  },
  methods: {
    goBack() {
      if (this.$route.name === 'ops-orders-add') {
        this.$router.push({
          path: '/ops/orders',
        })
      } else if (this.$route.name === 'ops-manufacture-add') {
        this.$router.push({
          path: '/ops/manufacture',
        })
      } else {
        this.$router.push({
          path: '/',
        })
      }
    },
  },
}
</script>
