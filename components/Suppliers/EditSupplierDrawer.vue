<template>
  <el-form
    v-if="currentSupplierss"
    ref="ruleForm"
    style="margin-left: 8px; margin-right: 32px"
    :model="ruleForm"
    :rules="rules"
    label-width="130px"
  >
    <el-form-item label="Supplier name" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input v-model="ruleForm.address" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Update</el-button
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
            message: 'Supplier Updated Succesfully.',
            type: 'success',
          })
          return true
        } else {
          this.$message({
            message: 'Error Updating Supplier.',
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
        customUrl: 'https://tasi-backend.azurewebsites.net/api/suppliers/1',
      })
      return data
    },
  },
}
</script>
