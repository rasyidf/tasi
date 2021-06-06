<template>
  <el-form
    ref="ruleForm"
    style="margin-left: 16px; margin-right: 32px"
    :model="ruleForm"
    :rules="rules"
    label-width="130px"
    label-position="left"
    class="demo-ruleForm"
  >
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.3em;
      "
    >
      <p>Tambah User</p>
      <el-tag type="success" size="small">_</el-tag>
    </div>
    <el-form-item label="Nama pengguna" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="Nama lengkap" prop="fullName">
      <el-input v-model="ruleForm.fullName"></el-input>
    </el-form-item>
    <el-form-item label="Alamat" prop="address">
      <el-input v-model="ruleForm.address" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="Wewenang" prop="role">
      <el-radio-group v-model="ruleForm.role">
        <el-radio-button label="Supervisor" name="role"></el-radio-button>
        <el-radio-button label="Manager" name="role"></el-radio-button>
        <el-radio-button label="Customer" name="role"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Tambah</el-button
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
        address: '',
        fullName: '',
        role: '',
        userId: 0,
        username: '',
      },
      rules: {
        fullName: [
          {
            required: true,
            message: 'Silakan masukan nama lengkap',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 50,
            message: 'Panjangnya harus 5 hingga 50',
            trigger: 'blur',
          },
        ],
        username: [
          {
            required: true,
            message: 'Silakan masukkan nama pengguna',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 50,
            message: 'Panjangnya harus 5 hingga 50',
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: 'Silakan masukan Alamat',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 200,
            message: 'Panjangnya harus 5 hingga 200',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters('users', {
      users: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },
  methods: {
    ...mapActions('users', {
      addUser: 'create',
    }),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser({ data: this.ruleForm })
          this.$refs.drawer.closeDrawer()
        } else {
          this.$message({
            message: 'Error Adding User.',
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
