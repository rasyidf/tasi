<template>
  <div class="main_content">
    <data-tables :data="manufactures" :loading="isLoading" layout="table">
      <el-table-column label="Terakhir Diubah" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.modifiedDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Dibuat">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.finalProduce }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Direncanakan">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.expectedProduce }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Hasil Id">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.finalProduce }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Perkiraan Selesai">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.expectedCompletion }}</span>
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
  computed: {
    ...mapGetters('manufactures', {
      manufactures: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },

  async created() {
    await this.$store.dispatch('manufactures/fetchList')
  },
}
</script>
