<template>
  <el-card class="main_navbar p-0" shadow="always">
    <el-menu
      :default-active="$route.path"
      menu-trigger="click"
      class="el-menu-demo"
      mode="horizontal"
      unique-opened
      @select="menuSelect"
    >
      <el-menu-item index="/">Beranda</el-menu-item>
      <el-submenu index="/manage">
        <template slot="title">Manajemen</template>
        <el-menu-item index="/manage/items">Barang</el-menu-item>
        <el-menu-item index="/manage/suppliers">Supplier</el-menu-item>
        <el-menu-item index="/manage/users">Pengguna</el-menu-item>
      </el-submenu>
      <el-submenu index="/ops">
        <template slot="title">Operasional</template>
        <el-menu-item index="/ops/orders">Pesanan</el-menu-item>
        <el-menu-item index="/ops/manufacture">Manufaktur</el-menu-item>
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
      <el-menu-item index="/about">Tentang</el-menu-item>
    </el-menu>
    <div class="avatar">
      <el-dropdown @command="handleProfileButton">
        <span class="el-dropdown-link">
          <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile" icon="el-icon-user"
            ><span>Profil</span></el-dropdown-item
          >
          <el-dropdown-item command="logout" icon="el-icon-arrow-left"
            ><span>Log Out</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
    handleProfileButton(command) {
      switch (command) {
        case 'logout':
          this.logout()
          break

        default:
          break
      }
    },
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style>
.main_navbar {
  border-bottom: solid 1px #e6e6e6;
}
.main_navbar .avatar {
  padding-top: 0.8em;
  padding-right: 0.8em;
}
.main_navbar .el-card__body {
  padding: 0 !important;
  display: flex;
  justify-content: space-between;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
