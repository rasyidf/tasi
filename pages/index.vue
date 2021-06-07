<template>
  <el-main class="dashboard">
    <h3 v-if="isSuperAdmin">Manajemen</h3>
    <el-row v-if="isSuperAdmin" :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <nuxt-link to="manage/items">
          <el-button icon="el-icon-takeaway-box">
            <div class="content">
              <span class="head">Barang</span>
              <div class="body"><p>Lihat data produk pada gudang.</p></div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <nuxt-link to="manage/suppliers">
          <el-button icon="el-icon-truck">
            <div class="content">
              <span class="head">Supplier</span>
              <div class="body"><p>Lihat data supplier bahan mentah.</p></div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <nuxt-link to="manage/users">
          <el-button icon="el-icon-user">
            <div class="content">
              <span class="head">Pengguna</span>
              <div class="body"><p>Lihat data pengguna dan aksesnya.</p></div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
    </el-row>
    <h3>Operasional</h3>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <nuxt-link to="ops/orders">
          <el-button icon="el-icon-shopping-cart-full">
            <div class="content">
              <span class="head">Pesanan</span>
              <div class="body"><p>Pesan/kirim barang manufaktur.</p></div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col v-if="isSuperAdmin" :xs="24" :sm="12">
        <nuxt-link to="ops/manufacture">
          <el-button icon="el-icon-box">
            <div class="content">
              <span class="head">Manufaktur</span>
              <div class="body"><p>Lihat data supplier bahan mentah.</p></div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
    </el-row>
    <h3>Laporan</h3>
    <el-row v-if="isSuperAdmin" :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <nuxt-link to="report/items">
          <el-button icon="el-icon-notebook-2">
            <div class="content">
              <span class="head">Laporan Barang</span>
              <div class="body">
                <p>Laporan transaksi barang dari supplier dan gudang.</p>
              </div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <nuxt-link to="report/manufacture">
          <el-button icon="el-icon-notebook-2">
            <div class="content">
              <span class="head">Laporan Manufaktur</span>
              <div class="body">
                <p>Laporan data hasil manufaktur barang.</p>
              </div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <nuxt-link to="report/transactions">
          <el-button icon="el-icon-notebook-2">
            <div class="content">
              <span class="head">Laporan Transaski</span>
              <div class="body">
                <p>Laporan transaksi supplier dan penjualan.</p>
              </div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
    </el-row>
    <el-row v-if="isSuperAdmin" :gutter="20">
      <el-col :xs="24" :sm="12">
        <nuxt-link to="report/audit_user">
          <el-button icon="el-icon-notebook-1">
            <div class="content">
              <span class="head"> Laporan Pengguna</span>
              <div class="body">
                <p>Laporan data pengguna dan hak aksesnya.</p>
              </div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :xs="24" :sm="12">
        <nuxt-link to="report/audit_supplier">
          <el-button icon="el-icon-notebook-1">
            <div class="content">
              <span class="head"> Laporan Supplier</span>
              <div class="body"><p>Laporan data supplier bahan mentah.</p></div>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  layout: 'default',
  computed: {
    isSuperAdmin() {
      return this.$store.state.auth.user.role === 'SuperAdmin'
    },
  },
}
</script>

<style>
.dashboard .el-col > .el-card {
  height: 6em;
}

.dashboard .el-button {
  width: 100%;
  margin-bottom: 0.5em;
  height: 7em;
  padding: 0em;
  display: flex;
  align-items: center;
}
.dashboard a {
  text-decoration: none;
}
.dashboard .el-button i {
  margin: 1em;
  font-size: 28px;
}
.dashboard {
  padding: 1em;
}
.dashboard .content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.dashboard .head {
  font-weight: bold;
  text-align: left;
}
.dashboard .body {
  margin-top: 0.4em;
  position: relative;
  word-wrap: break-word;
  line-height: 0.1rem;
}
.dashboard .body p {
  font-weight: 500;
  text-align: left;
}
</style>
