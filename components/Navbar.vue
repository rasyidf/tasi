<template>
  <el-card class="box-card" shadow="always">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="menuSelect"
    >
      <el-menu-item index="/">Beranda</el-menu-item>
      <el-submenu index="/data">
        <template slot="title">Manajemen</template>
        <el-menu-item index="/data/items">Barang</el-menu-item>
        <el-menu-item index="/data/suppliers">Supplier</el-menu-item>
        <el-menu-item index="/data/users">Pengguna</el-menu-item>
      </el-submenu>
      <el-submenu index="/op">
        <template slot="title">Operasional</template>
        <el-menu-item index="/op/orders">Pesanan</el-menu-item>
        <el-menu-item index="/op/manufacture">Manufaktur</el-menu-item>
      </el-submenu>
      <el-submenu index="/report">
        <template slot="title">Laporan</template>
        <el-menu-item index="/report/items">Transaksi Barang</el-menu-item>
        <el-menu-item index="/report/manufacture"
          >Transaksi Manufaktur</el-menu-item
        >
        <el-menu-item index="/report/stocks">Stok Barang</el-menu-item>
        <el-menu-item index="/report/audit_user">Audit Pengguna</el-menu-item>
        <el-menu-item index="/report/audit_supplier"
          >Audit Supplier</el-menu-item
        >
      </el-submenu>
      <el-menu-item index="/tentang">Tentang</el-menu-item>
    </el-menu>
  </el-card>
</template>

<script>
export default {
  methods: {
    menuSelect(index) {
      this.$router.push({
        path: index,
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
