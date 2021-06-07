<template>
  <div class="main_content">
    <data-tables
      :data="suppliers"
      :filters="filters"
      :loading="isLoading"
      layout="table"
    >
      <el-table-column label="Terakhir Diubah" width="250">
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
    </data-tables>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters('suppliers', {
      suppliers: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },
  async created() {
    await this.$store.dispatch('suppliers/fetchList')
  },
}
</script>
