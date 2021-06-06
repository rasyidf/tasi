<template>
  <el-form
    v-if="currentSupplierss"
    ref="ruleForm"
    style="margin-left: 16px; margin-right: 32px"
    :model="ruleForm"
    :rules="rules"
    label-position="left"
    label-width="130px"
    ><div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.3em;
      "
    >
      <p>Sunting Supplier</p>
      <el-tag size="small">{{ id }}</el-tag>
    </div>
    <el-form-item label="Nama Supplier" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Alamat" prop="address">
      <el-input v-model="ruleForm.address" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Perbarui</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      ruleForm: {
        name: '',
        address: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input Suppliers name',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 50,
            message: 'Length should be 5 to 50',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters('suppliers', {
      supplierById: 'byId',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),

    currentSupplierss() {
      return this.supplierById(this.id)
    },
  },
  watch: {
    $route: 'fetchData',
  },

  created() {
    this.fetchData()
    Object.assign(this.ruleForm, this.currentSupplierss)
  },
  methods: {
    ...mapActions('suppliers', {
      updateSuppliers: 'replace',
      fetchSuppliers: 'fetchSingle',
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateSuppliers({ id: this.id, data: this.ruleForm })
          this.$message({
            message: 'Informasi Supplier berhasil diperbarui.',
            type: 'success',
          })
          this.$refs.drawer.closeDrawer()
          return true
        } else {
          this.$message({
            message: 'Terjadi kesalahan saat memperbarui Supplier.',
            type: 'warning',
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    fetchData() {
      const data = this.fetchSuppliers({
        id: this.id,
      })
      return data
    },
  },
}
</script>
