<template>
  <el-main>
    <h3>Manajemen</h3>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card><i class="el-icon-takeaway-box"></i> </el-card>
      </el-col>
      <el-col :span="8">
        <el-card><i class="el-icon-truck"></i> </el-card>
      </el-col>
      <el-col :span="8">
        <el-card> <i class="el-icon-user"></i> </el-card
      ></el-col>
    </el-row>
    <h3>Operasional</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card><i class="el-icon-takeaway-box"></i> </el-card>
      </el-col>
      <el-col :span="12">
        <el-card><i class="el-icon-truck"></i> </el-card>
      </el-col>
    </el-row>
    <h3>Laporan</h3>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card><i class="el-icon-takeaway-box"></i> </el-card>
      </el-col>
      <el-col :span="5">
        <el-card><i class="el-icon-truck"></i> </el-card>
      </el-col>
      <el-col :span="5">
        <el-card> <i class="el-icon-user"></i> </el-card
      ></el-col>
      <el-col :span="4">
        <el-card><i class="el-icon-truck"></i> </el-card>
      </el-col>
      <el-col :span="4">
        <el-card> <i class="el-icon-user"></i> </el-card
      ></el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {}
</script>

<style>
.el-col > .el-card {
  height: 6em;
}

.el-main > .el-row {
  padding-top: 1em;
  padding-bottom: 1em;
}

.el-main {
  padding: 1em;
}
</style>
