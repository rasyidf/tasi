<template>
  <div class="main_content">
    <data-tables
      :data="orders"
      :filters="filters"
      :loading="isLoading"
      layout="tool, table"
    >
      <template #tool>
        <div>
          <el-row style="margin: 1em" class="no-print">
            <el-col span="8">
              <el-radio-group v-model="mode" @change="queryChanged(mode)">
                <el-radio-button label="Supplier" name="mode"></el-radio-button>
                <el-radio-button label="Sales" name="mode"></el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col span="8"></el-col>
            <el-col span="8"></el-col>
          </el-row>
        </div>
      </template>
      <el-table-column label="Terakhir Diubah" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.modifiedDate | formatDate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tipe" hidden>
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="PIC" hidden>
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.userFullname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Supplier" hidden>
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.supplierName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Harga">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.totalSales | formatCurrency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Berat">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.totalWeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pajak">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.totalTax | formatCurrency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Total">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.subTotal | formatCurrency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status Terakhir">
        <template slot-scope="scope">
          {{ scope.row.lastStatus.code }}
        </template>
      </el-table-column>
    </data-tables>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      mode: 'Supplier',
      filters: [{ prop: 'type', value: this.query }],
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
  },

  async created() {
    await this.$store.dispatch('orders/fetchList')
  },
  methods: {
    queryChanged(value) {
      this.filters = [{ prop: 'type', value }]
    },
  },
}
</script>
