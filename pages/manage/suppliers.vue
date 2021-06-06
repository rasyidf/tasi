<template>
  <div class="container">
    <el-card class="p-0">
      <data-tables
        :data="suppliers"
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
        <el-table-column label="Date" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.modifiedDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Address">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="bottom">
              {{ scope.row.latitude }}, {{ scope.row.longitude }}
              <div slot="reference" class="name-wrapper">
                <span> {{ scope.row.address }}</span>
              </div>
            </el-popover>
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
      :visible.sync="drawerShow"
      :with-header="false"
      size="40%"
      destroy-on-close
      direction="rtl"
    >
      <add-supplier-drawer v-if="addDrawerShow" @completed="OnCompleted()" />
      <edit-supplier-drawer
        v-if="editDrawerShow"
        :id="selectedIndex"
        @completed="OnCompleted()"
      />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import AddSupplierDrawer from '../../components/Suppliers/AddSupplierDrawer.vue'
import EditSupplierDrawer from '../../components/Suppliers/EditSupplierDrawer.vue'
import Toolbar from '../../components/Toolbar.vue'

export default {
  components: {
    Toolbar,
    AddSupplierDrawer,
    EditSupplierDrawer,
  },
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
    ...mapGetters('suppliers', {
      suppliers: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
    drawerTitle() {
      if (this.addDrawerShow) {
        return 'Tambahkan Supplier.'
      }
      if (this.editDrawerShow) {
        return 'Edit Supplier [ ' + this.selectedIndex + ' ]'
      }
      return 'Supplier'
    },
  },

  async created() {
    await this.$store.dispatch('suppliers/fetchList')
  },
  methods: {
    ...mapActions('suppliers', {
      fetchSuppliers: 'fetchList',
      deleteSupplier: 'destroy',
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
      return this.fetchSuppliers()
    },
    handleEdit(index, row) {
      this.selectedIndex = index
      this.ActivateDrawer('edit')
    },
    handleDelete(index, row) {
      this.deleteSupplier({ id: index + 1 })
      this.$message({
        message: 'Supplier berhasil di hapus.',
        type: 'success',
      })
    },
    handleAdd() {
      this.ActivateDrawer('add')
    },
  },
}
</script>
