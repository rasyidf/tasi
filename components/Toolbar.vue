<template>
  <el-row style="padding: 0.5em" :gutter="16">
    <el-col :span="8">.</el-col>
    <el-col :span="8">.</el-col>
    <el-col :span="8">
      <el-row type="flex">
        <el-col :span="6"
          ><el-button size="medium" @click="$emit('addItem', '')">
            Add Item
          </el-button>
        </el-col>
        <el-col :span="18"
          ><el-input
            value=""
            size="medium"
            placeholder="Tulis Sesuatu"
            prefix-icon="el-icon-search"
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
