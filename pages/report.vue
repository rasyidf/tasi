<template>
  <div class="container">
    <el-page-header
      class="no-print"
      :content="ChildName"
      style="margin-bottom: 2em"
      @back="goBack"
    >
    </el-page-header>
    <div
      style="display: flex; flex-orientation: column; justify-content: center"
    >
      <h2>{{ ChildName }}</h2>
    </div>
    <el-row>
      <el-col span="8">
        <el-row>
          <el-col span="8"> <p>Dicetak Tanggal</p></el-col>
          <el-col span="16">
            <p>: {{ Date() }}</p></el-col
          >
        </el-row>
      </el-col>
      <el-col span="8"></el-col>
      <el-col span="8"></el-col>
    </el-row>
    <el-row>
      <el-col span="8">
        <el-row>
          <el-col span="8"> <p>Dicetak Oleh</p></el-col>
          <el-col span="16"
            ><p>: {{ $store.state.auth.user.fullName }}</p></el-col
          >
        </el-row>
      </el-col>
      <el-col span="8"></el-col>
      <el-col span="8"></el-col>
    </el-row>
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
        case 'report-transactions':
          return 'Laporan Transaksi'
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
/* .main_content {
  padding: 0;
  height: calc(100vh - 216px);
  display: flex;
  align-content: center;
  justify-content: center;
  background: url('/empty.png') no-repeat center;
} */
</style>
