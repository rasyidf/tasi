<template>
  <div class="container">
    <el-card class="p-0">
      <el-table v-loading="isLoading" :data="users" style="width: 100%">
        <el-table-column label="Id">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            {{ scope.row.fullName }}
          </template>
        </el-table-column>
        <el-table-column label="Username">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="Role">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="128">
          <template slot="header" slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="handleAdd(scope.$index, scope.row)"
            >
              Add Item
            </el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-popconfirm
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              icon="el-icon-info"
              icon-color="red"
              title="Are you sure to delete this?"
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
      </el-table>
    </el-card>
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawerShow"
      size="40%"
      destroy-on-close
      direction="rtl"
    >
      <add-user-drawer v-if="addDrawerShow" />
      <edit-user-drawer v-if="editDrawerShow" :id="selectedIndex" />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import AddUserDrawer from '../../components/Users/AddUserDrawer.vue'
import EditUserDrawer from '../../components/Users/EditUserDrawer.vue'

export default {
  components: { AddUserDrawer, EditUserDrawer },
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
      suppliers: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
    drawerTitle() {
      if (this.addDrawerShow) {
        return 'Add User'
      }
      if (this.editDrawerShow) {
        return 'Edit User [ ' + this.selectedIndex + ' ]'
      }
      return 'User'
    },
  },

  async created() {
    await this.$store.dispatch('suppliers/fetchList')
  },
  methods: {
    ...mapActions('users', {
      fetchSuppliers: 'fetchList',
      deleteSupplier: 'destroy',
    }),
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
      return this.fetchSuppliers()
    },
    handleEdit(index, row) {
      this.selectedIndex = index
      this.ActivateDrawer('edit')
    },
    handleDelete(index, row) {
      this.deleteSupplier({ id: index + 1 })
      this.$message({
        message: 'Deleted.',
        type: 'success',
      })
    },
    handleAdd() {
      this.ActivateDrawer('add')
    },
  },
}
</script>
