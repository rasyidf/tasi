<template>
  <div class="container">
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card shadow="never" :body-style="{ padding: '16px' }">
          <div slot="header">
            <span
              >Transaksi
              {{ data.type == 'Supplier' ? 'Supplier' : 'Pelanggan' }}</span
            >
          </div>
          <el-row>
            <el-col :span="12">Sales</el-col>
            <el-col :span="12">{{ data.totalSales }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">Shipping</el-col>
            <el-col :span="12">{{ data.totalShipping }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">Weight</el-col>
            <el-col :span="12">{{ data.totalWeight }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">Tax</el-col>
            <el-col :span="12">{{ data.totalTax }}</el-col>
          </el-row>
          <el-divider
            direction="horizontal"
            content-position="left"
          ></el-divider>
          <el-row>
            <el-col :span="12">Total</el-col>
            <el-col :span="12">{{ data.subTotal }}</el-col>
          </el-row>
        </el-card>
        <el-card
          shadow="never"
          style="margin-top: 1em"
          :body-style="{ padding: '0px' }"
        >
          <div slot="header">
            <span>Details</span>
          </div>
          <data-tables :data="data.orderDetails" layout="table">
            <el-table-column label="Tanggal" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.modifiedDate
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Nama">
              <template slot-scope="scope">
                {{ getProductById(scope.row.productId) }}
              </template>
            </el-table-column>
            <el-table-column label="Jumlah">
              <template slot-scope="scope">
                {{ scope.row.quantity }}
              </template>
            </el-table-column>
            <el-table-column label="Harga Unit">
              <template slot-scope="scope">
                {{ scope.row.unitPrice }}
              </template>
            </el-table-column>
            <el-table-column label="Harga Total">
              <template slot-scope="scope">
                {{ scope.row.totalPrice }}
              </template>
            </el-table-column>
          </data-tables>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" :body-style="{ padding: '16px' }">
          <div slot="header">
            <span>History</span>
          </div>
          <el-timeline :reverse="true">
            <el-timeline-item
              v-for="item in data.statusHistory"
              :key="item.orderStatusHistoryId"
              :type="getColorInID(item.code)"
              :timestamp="item.modifiedDate"
              placement="top"
              size="normal"
            >
              <el-tag
                :type="getColorInID(item.code)"
                size="medium"
                effect="plain"
              >
                {{ getStatusInID(item.code) }}</el-tag
              >
              {{ item.message }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const slug = params.id // Ketika memanggil /abc maka slug akan menjadi "abc"
    const data = await $axios.$get(
      `https://tasi-backend.azurewebsites.net/api/orders/${slug}`
    )
    const products = {}
    const order = data.data
    console.log(order)
    if (order.orderDetails) {
      order.orderDetails.forEach(async (el) => {
        if (!(el.productId in products)) {
          try {
            const pd = await $axios.$get(
              `https://tasi-backend.azurewebsites.net/api/products/${el.productId}`
            )
            products[el.productId] = pd.data
          } catch {
            products[el.productId] = ' '
          }
        }
      })
    }
    return { slug, data: order, products }
  },
  methods: {
    getProductById(id) {
      return this.products[id]
    },
    getColorInID(value) {
      switch (value) {
        case 'Requested':
        case 'InProcess':
          return 'default'
        case 'Delivery':
          return 'info'
        case 'Completed':
          return 'success'
        case 'Cancelled':
          return 'danger'
      }
    },
    getStatusInID(value) {
      switch (value) {
        case 'Requested':
          return 'Dipesan'
        case 'InProcess':
          return 'Dalam Proses'
        case 'Delivery':
          return 'Dikirim'
        case 'Completed':
          return 'Selesai'
        case 'Cancelled':
          return 'Dibatalkan'
      }
    },
    getNextStep(value) {
      switch (value) {
        case 'Requested':
          return 'Proses'
        case 'InProcess':
          return 'Kirim'
        case 'Delivery':
          return 'Konfirmasi'
        case 'Completed':
          return 'Selesai'
        case 'Cancelled':
          return 'Dibatalkan'
      }
    },
  },
}
</script>

<style></style>
