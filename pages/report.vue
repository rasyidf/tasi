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
        case 'report-audit_supplier':
          return 'Audit Supplier'
        case 'report-audit_user':
          return 'Audit User'
        case 'report-items':
          return 'Items Reports'
        case 'report-manufacture':
          return 'Manufaktur'
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
