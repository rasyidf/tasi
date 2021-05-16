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
        case 'op-manufacture':
          return 'Manufaktur'
        case 'op-suppliers':
          return 'Suppliers'
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
