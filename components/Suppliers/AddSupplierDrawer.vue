<template>
  <el-form
    ref="ruleForm"
    style="margin-left: 8px; margin-right: 32px"
    :model="ruleForm"
    :rules="rules"
    label-width="130px"
    class="demo-ruleForm"
  >
    <el-form-item label="Supplier name" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input v-model="ruleForm.address" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Create</el-button
      >
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
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
            message: 'Please input Product name',
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
      products: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },
  methods: {
    ...mapActions('suppliers', {
      addProduct: 'create',
    }),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addProduct({ data: this.ruleForm })
        } else {
          this.$message({
            message: 'Error Adding Supplier.',
            type: 'warning',
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
