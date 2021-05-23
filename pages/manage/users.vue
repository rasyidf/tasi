<template>
  <div class="container">
    <el-card class="p-0">
      <el-table v-loading="isLoading" :data="users" style="width: 100%">
        <el-table-column label="Id">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            {{ scope.row.FullName }}
          </template>
        </el-table-column>
        <el-table-column label="Username">
          <template slot-scope="scope">
            {{ scope.row.Username }}
          </template>
        </el-table-column>
        <el-table-column label="Role">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.Role }}</el-tag>
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
  methods: {
    handleEdit(index, row) {
      this.$message({
        message: 'Edited.',
        type: 'success',
      })
    },
    handleDelete(index, row) {
      this.$message({
        message: 'Deleted.',
        type: 'success',
      })
    },
    handleAdd(index, row) {
      this.$message({
        message: 'Added.',
        type: 'success',
      })
    },
  },
}
</script>
