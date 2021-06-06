<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card
          class="products-card"
          style="height: calc(100vh - 210px); padding-left: 0.5em"
        >
          <order-toolbar @select="OnSelectItem($event)"></order-toolbar>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-table
                :data="tableData"
                style="
                  height: calc(100vh - 210px);
                  padding-left: 0.5em;
                  width: 100%;
                "
              >
                <el-table-column prop="name" label="Item Name" width="180">
                </el-table-column>
                <el-table-column prop="price" label="Price" width="180">
                  <template slot-scope="scope">
                    <el-tag> Rp. {{ scope.row.price }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="qty" label="Quantity">
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.qty"
                      :min="1"
                      value="1"
                      :max="scope.row.stock"
                      size="mini"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column label="Sub Total">
                  <template slot-scope="scope">
                    <span>Rp. {{ scope.row.qty * scope.row.price }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          class="order__card"
          style="height: calc(100vh - 210px); padding-left: 0.5em"
          ><el-container style="height: 100%">
            <el-header><h1>Order</h1></el-header>
            <el-main>
              <el-row>
                <el-col :span="6"> <h5>Total</h5> </el-col>
                <el-col :span="18">
                  <h4>Rp.</h4>
                </el-col>
              </el-row>
            </el-main>
            <el-footer>
              <el-button type="success" icon="el-icon-shopping-cart-full"
                >Order Now</el-button
              ></el-footer
            >
          </el-container>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import OrderToolbar from '../../components/OrderToolbar.vue'

export default {
  components: {
    OrderToolbar,
  },
  data() {
    return {
      tableData: [],
    }
  },
  computed: {
    ...mapGetters('products', {
      productById: 'byId',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },
  methods: {
    ...mapActions('products', {
      fetchProduct: 'fetchSingle',
    }),
    async OnSelectItem(item) {
      try {
        const product = await this.$axios.$get(
          `https://tasi-backend.azurewebsites.net/api/products/${item}`
        )
        console.log(product)
        console.log(this.tableData)
        const a = this.tableData.find(
          (elem) => elem.barcode === product.data.barcode
        )
        console.log(a)
        if (
          this.tableData.some((elem) => elem.barcode === product.data.barcode)
        ) {
          a.qty += 1
        } else {
          this.tableData = [...this.tableData, { ...product.data, qty: 1 }]
        }
      } catch {
        this.$message({
          message: 'Gagal mengambil detail produk.',
          type: 'warning',
        })
      }
    },
  },
}
</script>

<style>
.products-card .el-card__body {
  height: calc(100% - 2em);
  padding: 0em;
}
.order__card .el-card__body {
  height: calc(100% - 2em);
  padding-bottom: 1em;
}
</style>
