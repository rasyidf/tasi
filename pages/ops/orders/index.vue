<template>
  <div class="container">
    <el-card class="p-0">
      <data-tables
        :data="orders"
        :filters="filters"
        :loading="isLoading"
        layout="tool, table, pagination"
      >
        <template #tool>
          <toolbar
            :query="query"
            @addItem="handleAdd()"
            @queryChanged="queryChanged($event)"
          ></toolbar>
        </template>
        <el-table-column label="Tanggal Dibuat">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.modifiedDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tipe">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Harga">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.subTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status Terakhir">
          <template slot-scope="scope">
            {{ scope.row.lastStatus.code }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="300">
          <template slot="header"> Operasi </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-info"
              @click="handleStepBack(scope.$index + 1, scope.row)"
              >Details</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-right"
              @click="handleStepForward(scope.$index + 1, scope.row)"
              >Prosess</el-button
            >
            <el-popconfirm
              confirm-button-text="Ya"
              cancel-button-text="Tidak"
              icon="el-icon-info"
              icon-color="red"
              title="Apakah Anda yakin akan mereject transaksi ini"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                slot="reference"
                size="mini"
                icon="el-icon-close"
                type="danger"
                >Tolak</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </data-tables>
    </el-card>
    <el-drawer
      ref="drawer"
      :with-header="false"
      :visible.sync="drawerShow"
      size="40%"
      destroy-on-close
      direction="rtl"
    >
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Toolbar from '../../../components/Toolbar.vue'

export default {
  components: { Toolbar },
  data() {
    return {
      selectedIndex: 0,
      addDrawerShow: false,
      drawerShow: false,
      editDrawerShow: false,
      query: '',
      filters: [{ prop: 'name', value: this.query }],
    }
  },
  computed: {
    ...mapGetters('orders', {
      orders: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
    drawerTitle() {
      if (this.addDrawerShow) {
        return 'Tambahkan pengguna'
      }
      if (this.editDrawerShow) {
        return 'Edit Pengguna [ ' + this.selectedIndex + ' ]'
      }
      return 'Pengguna'
    },
  },

  async created() {
    await this.$store.dispatch('orders/fetchList')
  },
  methods: {
    ...mapActions('orders', {
      fetchUsers: 'fetchList',
      deleteUser: 'destroy',
    }),
    OnCompleted() {
      this.$refs.drawer.closeDrawer()
    },
    queryChanged(value) {
      this.filters = [{ prop: 'name', value }]
    },
    ActivateDrawer(key) {
      if (key === 'add') {
        this.editDrawerShow = false
        this.addDrawerShow = true
      } else if (key === 'edit') {
        this.editDrawerShow = true
        this.addDrawerShow = false
      }
      this.drawerShow = true
    },
    fetchData() {
      return this.fetchUsers()
    },
    handleStepBack(index, row) {
      this.selectedIndex = index
    },
    handleStepForward(index, row) {
      this.selectedIndex = index
    },
    handleDelete(index, row) {
      this.$message({
        message: 'Pengguna berhasil di hapus.',
        type: 'success',
      })
    },
    handleAdd() {
      this.$router.push('/ops/orders/add')
    },
  },
}
</script>
