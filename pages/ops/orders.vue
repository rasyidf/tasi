<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card style="padding: 1em">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input
                size="mini"
                placeholder="Scan barcode or Add Item"
                prefix-icon="el-icon-search"
              >
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-button size="mini">Filter</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-table :data="tableData" height="250" style="width: 100%">
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
                      :max="10"
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
          ><el-container>
            <el-header style="padding-left: 1em"><h1>Order</h1></el-header>
            <el-main>
              <el-row>
                <el-col :span="6"> <h5>Total</h5> </el-col>
                <el-col :span="18">
                  <h4>Rp. {{ priceAll }}</h4>
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
export default {
  data() {
    return {
      tableData: [
        {
          name: 'Paper',
          price: '50000',
          qty: '1',
        },
        {
          name: 'Pencil 1 Pack',
          price: '50000',
          qty: '1',
        },
        {
          name: 'Ruler',
          price: '40000',
          qty: '1',
        },
      ],
    }
  },
  computed: {
    priceAll() {
      return this.tableData.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.price * currentValue.qty
      }, 0)
    },
  },
}
</script>

<style></style>
