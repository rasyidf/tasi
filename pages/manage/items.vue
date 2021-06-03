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
            @addItem="handleAdd(scope.$index, scope.row)"
          ></toolbar>
        </template>
        <el-table-column label="Date" width="200">
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
        <el-table-column label="Name">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Price">
          <template slot-scope="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="Stock">
          <template slot-scope="scope">
            {{ scope.row.stock }} {{ scope.row.unit }}
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
              @click="handleEdit(scope.$index + 1, scope.row)"
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
import AddProductDrawer from '../../components/AddProductDrawer.vue'
import Toolbar from '../../components/Toolbar.vue'
import EditProductDrawer from '../../components/EditProductDrawer.vue'

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
      filters: [{ prop: 'Name', value: this.query }],
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
    fetchData() {
      return this.fetchArticles()
    },
    handleEdit(index, row) {
      this.editDrawerShow = true
      this.selectedIndex = index
      this.drawerShow = true
    },
    handleDelete(index, row) {
      this.deleteProduct({ id: index + 1 })
      this.$message({
        message: 'Deleted.',
        type: 'success',
      })
    },
    handleAdd(index, row) {
      this.addDrawerShow = true
      this.drawerShow = true
    },
  },
}
</script>
