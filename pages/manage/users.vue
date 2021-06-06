<template>
  <div class="container">
    <el-card class="p-0">
      <data-tables
        :data="users"
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
        <el-table-column
          label="Id"
          width="50"
          header-align="center"
          style="margin-left: 10px"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nama">
          <template slot-scope="scope">
            {{ scope.row.fullName }}
          </template>
        </el-table-column>
        <el-table-column label="Nama pengguna">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="Wewenang">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="128">
          <template slot="header"> Operasi </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index + 1, scope.row)"
            ></el-button>
            <el-popconfirm
              confirm-button-text="Oke"
              cancel-button-text="Tidak, terima kasih"
              icon="el-icon-info"
              icon-color="red"
              title="Apakah Anda yakin akan menghapus ini?"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                slot="reference"
                size="mini"
                icon="el-icon-delete"
                type="danger"
              ></el-button>
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
      <add-user-drawer v-if="addDrawerShow" @completed="OnCompleted()" />
      <edit-user-drawer
        v-if="editDrawerShow"
        :id="selectedIndex"
        @completed="OnCompleted()"
      />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import AddUserDrawer from '../../components/Users/AddUserDrawer.vue'
import EditUserDrawer from '../../components/Users/EditUserDrawer.vue'
import Toolbar from '../../components/Toolbar.vue'

export default {
  components: { AddUserDrawer, EditUserDrawer, Toolbar },
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
    ...mapGetters('users', {
      users: 'list',
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
    await this.$store.dispatch('users/fetchList')
  },
  methods: {
    ...mapActions('users', {
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
    handleEdit(index, row) {
      if (row.role === 'SuperAdmin') {
        this.$message({
          message: 'Superadmin tidak dapat disunting.',
          type: 'warning',
        })
        return
      }
      this.selectedIndex = index
      this.ActivateDrawer('edit')
    },
    handleDelete(index, row) {
      if (row.role === 'SuperAdmin') {
        this.$message({
          message: 'Superadmin tidak dapat dihapus.',
          type: 'warning',
        })
        return
      }
      this.deleteUser({ id: index + 1 })
      this.$message({
        message: 'Pengguna berhasil di hapus.',
        type: 'success',
      })
    },
    handleAdd() {
      this.ActivateDrawer('add')
    },
  },
}
</script>
