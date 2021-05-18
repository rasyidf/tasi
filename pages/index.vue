<template>
  <el-main class="dashboard">
    <h3>Manajemen</h3>
    <el-row :gutter="20">
      <el-col :span="8">
        <nuxt-link to="data/items">
          <el-button icon="el-icon-takeaway-box">
            <div class="content">
              <span class="head"> Barang</span>
              <span class="body"> Lihat data produk pada gudang.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :span="8">
        <nuxt-link to="data/suppliers">
          <el-button icon="el-icon-truck">
            <div class="content">
              <span class="head"> Supplier</span>
              <span class="body"> Lihat data supplier bahan mentah.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :span="8">
        <nuxt-link to="data/users">
          <el-button icon="el-icon-user">
            <div class="content">
              <span class="head"> Pengguna</span>
              <span class="body"> Lihat data pengguna dan aksesnya.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
    </el-row>
    <h3>Operasional</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <nuxt-link to="op/orders">
          <el-button icon="el-icon-shopping-cart-full">
            <div class="content">
              <span class="head"> Pesanan</span>
              <span class="body"> Pesan/kirim barang manufaktur.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :span="12">
        <nuxt-link to="op/manufacture">
          <el-button icon="el-icon-box">
            <div class="content">
              <span class="head"> Manufaktur</span>
              <span class="body"> Lihat data supplier bahan mentah.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
    </el-row>
    <h3>Laporan</h3>
    <el-row :gutter="20">
      <el-col :span="8">
        <nuxt-link to="report/items">
          <el-button icon="el-icon-notebook-2">
            <div class="content">
              <span class="head"> Transaksi Barang</span>
              <span class="body">
                Laporan transaksi barang dari supplier dan gudang.</span
              >
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :span="8">
        <nuxt-link to="report/manufacture">
          <el-button icon="el-icon-notebook-2">
            <div class="content">
              <span class="head"> Transaksi Manufaktur</span>
              <span class="body"> Laporan data hasil manufaktur barang.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :span="8">
        <nuxt-link to="report/stocks">
          <el-button icon="el-icon-notebook-2">
            <div class="content">
              <span class="head"> Stok barang</span>
              <span class="body"> Laporan stok barang pada gudang.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
    </el-row>
    <h3></h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <nuxt-link to="report/audit_user">
          <el-button icon="el-icon-notebook-1">
            <div class="content">
              <span class="head"> Audit Pengguna</span>
              <span class="body"> Laporan data pengguna dan hak aksesnya.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
      <el-col :span="12">
        <nuxt-link to="report/audit_supplier">
          <el-button icon="el-icon-notebook-1">
            <div class="content">
              <span class="head"> Audit Supplier</span>
              <span class="body"> Laporan data supplier bahan mentah.</span>
            </div>
          </el-button>
        </nuxt-link>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {}
</script>

<style>
.dashboard .el-col > .el-card {
  height: 6em;
}

.dashboard .el-button {
  width: 100%;
  height: 8em;
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
}
.dashboard .head {
  font-weight: bold;
  text-align: left;
}
.dashboard .body {
  margin-top: 0.5em;
  font-weight: 500;
  text-align: start;
  overflow: auto;
  overflow-y: hidden;
  overflow-x: hidden;
  overflow-wrap: normal;
}
</style>
