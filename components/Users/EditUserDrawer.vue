<template>
  <el-form
    v-if="currentUserss"
    ref="ruleForm"
    style="margin-left: 8px; margin-right: 32px"
    :model="ruleForm"
    :rules="rules"
    label-width="130px"
  >
    <el-form-item label="User name" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="Full name" prop="fullName">
      <el-input v-model="ruleForm.fullName"></el-input>
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input v-model="ruleForm.address" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="Role" prop="role">
      <el-radio-group v-model="ruleForm.role">
        <el-radio-button label="SuperAdmin" name="role"></el-radio-button>
        <el-radio-button label="Supervisor" name="role"></el-radio-button>
        <el-radio-button label="Manager" name="role"></el-radio-button>
        <el-radio-button label="Customer" name="role"></el-radio-button>
      </el-radio-group>
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
        address: '',
        fullName: '',
        role: '',
        userId: 0,
        username: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input User name',
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
    ...mapGetters('users', {
      userById: 'byId',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),

    currentUserss() {
      return this.userById(this.id)
    },
  },
  watch: {
    $route: 'fetchData',
  },

  created() {
    this.fetchData()
    Object.assign(this.ruleForm, this.currentUserss)
  },
  methods: {
    ...mapActions('users', {
      updateUsers: 'replace',
      fetchUsers: 'fetchSingle',
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUsers({ id: this.id, data: this.ruleForm })
          this.$message({
            message: 'User Updated Succesfully.',
            type: 'success',
          })
          return true
        } else {
          this.$message({
            message: 'Error Updating User.',
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
      const data = this.fetchUsers({
        id: this.id,
        customUrl: 'https://tasi-backend.azurewebsites.net/api/users/1',
      })
      return data
    },
  },
}
</script>
