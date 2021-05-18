<template>
  <div class="container">
    <el-card class="p-0">
      <el-table v-loading="isLoading" :data="products" style="width: 100%">
        <el-table-column label="Date" width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.ModifiedDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Barcode" width="100">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="bottom">
              <VueBarcode :value="scope.row.barcode" />
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.Barcode }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            {{ scope.row.Name }}
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
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import VueBarcode from 'vue-barcode'

export default {
  components: {
    VueBarcode,
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
    handleEdit(index, row) {
      // eslint-disable-next-line no-console
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.$message({
        message: 'Deleted.',
        type: 'success',
      })
    },
    handleAdd(index, row) {
      this.loading = true
      this.$store.commit('products/fetchAllProducts', null)
      this.loading = false
    },
  },
}
</script>
