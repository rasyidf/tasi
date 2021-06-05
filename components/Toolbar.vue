<template>
  <el-row style="padding: 0.5em" :gutter="16">
    <el-col :xs="0" :sm="4" :md="6" :lg="8" :xl="9"><br /></el-col>
    <el-col :xs="0" :sm="4" :md="6" :lg="8" :xl="9"><br /></el-col>
    <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
      <el-row type="flex" :gutter="16">
        <el-col :span="6"
          ><el-button
            size="medium"
            style="width: 100%"
            @click="$emit('addItem', '')"
          >
            Tambah
          </el-button>
        </el-col>
        <el-col :span="18"
          ><el-input
            v-model="value"
            type="text"
            size="medium"
            placeholder="Tulis Sesuatu"
            prefix-icon="el-icon-search"
            @input="$emit('queryChanged', value)"
          >
          </el-input>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'ToolBar',
  data() {
    return {
      value: '',
    }
  },
}
</script>
<style></style>
