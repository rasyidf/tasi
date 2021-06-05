<template>
  <div class="container">
    <el-card class="p-0">
      <data-tables
        :data="products"
        :filters="filters"
        layout="tool, table, pagination"
      >
        <template #tool>
          <toolbar
            :query="query"
            @addItem="handleAdd()"
            @queryChanged="queryChanged($event)"
          ></toolbar>
        </template>
        <el-table-column label="Tanggal" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.modifiedDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Barcode" width="130">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="bottom">
              <VueBarcode :value="scope.row.barcode" />
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.barcode }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Nama">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Harga">
          <template slot-scope="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="Stok">
          <template slot-scope="scope">
            {{ scope.row.stock }} {{ scope.row.unit }}
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

      <el-drawer
        :title="drawerTitle"
        :visible.sync="drawerShow"
        size="40%"
        destroy-on-close
        direction="rtl"
      >
        <add-product-drawer v-if="addDrawerShow" />
        <edit-product-drawer v-if="editDrawerShow" :id="selectedIndex" />
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import VueBarcode from 'vue-barcode'
import AddProductDrawer from '../../components/Products/AddProductDrawer.vue'
import EditProductDrawer from '../../components/Products/EditProductDrawer.vue'
import Toolbar from '../../components/Toolbar.vue'

export default {
  components: {
    VueBarcode,
    AddProductDrawer,
    EditProductDrawer,
    Toolbar,
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
    ...mapGetters('products', {
      products: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
    drawerTitle() {
      if (this.addDrawerShow) {
        return 'Add Products'
      }
      if (this.editDrawerShow) {
        return 'Edit Products [ ' + this.selectedIndex + ' ]'
      }
      return 'Product'
    },
  },
  async created() {
    await this.$store.dispatch('products/fetchList')
  },
  methods: {
    ...mapActions('products', {
      fetchArticles: 'fetchList',
      deleteProduct: 'destroy',
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
      return this.fetchArticles()
    },
    handleEdit(index, row) {
      this.selectedIndex = index
      this.ActivateDrawer('edit')
    },
    handleDelete(index, row) {
      this.deleteProduct({ id: index + 1 })
      this.$message({
        message: 'Produk berhasil di hapus.',
        type: 'success',
      })
    },
    handleAdd() {
      this.ActivateDrawer('add')
    },
  },
}
</script>
