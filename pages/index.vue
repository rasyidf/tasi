<template>
  <el-main>
    <h3>Manajemen</h3>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button icon="el-icon-takeaway-box">
          <div class="content">
            <span class="head"> Barang</span>
            <span class="body"> Lihat data produk pada gudang.</span>
          </div>
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button icon="el-icon-truck">
          <div class="content">
            <span class="head"> Supplier</span>
            <span class="body"> Lihat data supplier bahan mentah.</span>
          </div>
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button icon="el-icon-user">
          <div class="content">
            <span class="head"> Pengguna</span>
            <span class="body"> Lihat data pengguna dan aksesnya.</span>
          </div>
        </el-button>
      </el-col>
    </el-row>
    <h3>Operasional</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button icon="el-icon-shopping-cart-full">
          <div class="content">
            <span class="head"> Pesanan</span>
            <span class="body"> Pesan/kirim barang manufaktur.</span>
          </div>
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button icon="el-icon-takeaway-box">
          <div class="content">
            <span class="head"> Manufaktur</span>
            <span class="body"> Lihat data supplier bahan mentah.</span>
          </div>
        </el-button>
      </el-col>
    </el-row>
    <h3>Laporan</h3>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button icon="el-icon-takeaway-box">
          <div class="content">
            <span class="head"> Transaksi Barang</span>
            <span class="body">
              Laporan transaksi barang dari supplier dan gudang.</span
            >
          </div>
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button icon="el-icon-takeaway-box">
          <div class="content">
            <span class="head"> Transaksi Manufaktur</span>
            <span class="body"> Laporan data hasil manufaktur barang.</span>
          </div>
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button icon="el-icon-takeaway-box">
          <div class="content">
            <span class="head"> Stok barang</span>
            <span class="body"> Laporan stok barang pada gudang.</span>
          </div>
        </el-button>
      </el-col>
    </el-row>
    <h3></h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button icon="el-icon-takeaway-box">
          <div class="content">
            <span class="head"> Audit Pengguna</span>
            <span class="body"> Laporan data pengguna dan hak aksesnya.</span>
          </div>
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button icon="el-icon-takeaway-box">
          <div class="content">
            <span class="head"> Audit Supplier</span>
            <span class="body"> Laporan data supplier bahan mentah.</span>
          </div>
        </el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {}
</script>

<style>
.el-col > .el-card {
  height: 6em;
}

.el-main .el-button {
  width: 100%;
  height: 8em;
  padding: 0em;
  display: flex;
  align-items: center;
}
.el-main .el-button i {
  margin: 1em;
  font-size: 28px;
}
.el-main {
  padding: 1em;
}
.content {
  display: flex;
  flex-direction: column;
}
.head {
  font-weight: bold;
  text-align: left;
}
.body {
  margin-top: 0.5em;
  font-weight: 500;
  text-align: start;
}
</style>
