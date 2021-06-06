<template>
  <div class="main_content">
    <data-tables
      :data="users"
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
      <el-table-column label="Id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Nama">
        <template slot-scope="scope">
          {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column label="Nama pengguna">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Wewenang">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
    </data-tables>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters('users', {
      users: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },
  async created() {
    await this.$store.dispatch('users/fetchList')
  },
}
</script>
