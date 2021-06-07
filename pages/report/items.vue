<template>
  <div class="main_content">
    <data-tables
      :data="products"
      :filters="filters"
      :loading="isLoading"
      layout="table"
    >
      <el-table-column label="Terakhir Diubah" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.modifiedDate | formatDate
          }}</span>
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
          {{ scope.row.price | formatCurrency }}
        </template>
      </el-table-column>
      <el-table-column label="Stok">
        <template slot-scope="scope">
          {{ scope.row.stock }} {{ scope.row.unit }}
        </template>
      </el-table-column>
    </data-tables>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import VueBarcode from 'vue-barcode'

export default {
  components: {
    VueBarcode,
  },
  data() {
    return {
      selectedIndex: 0,
      addDrawerShow: false,
      drawerShow: false,
      editDrawerShow: false,
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
  },
  async created() {
    await this.$store.dispatch('products/fetchList')
  },
  methods: {
    ...mapActions('products', {
      fetchArticles: 'fetchList',
      deleteProduct: 'destroy',
    }),
    OnCompleted() {
      this.$refs.drawer.closeDrawer()
    },
    fetchData() {
      return this.fetchArticles()
    },
  },
}
</script>
