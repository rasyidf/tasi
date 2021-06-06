<template>
  <el-form
    ref="ruleForm"
    style="margin-left: 16px; margin-right: 32px"
    :model="ruleForm"
    :rules="rules"
    label-position="left"
    label-width="130px"
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
      <p>Tambah Produk</p>
      <el-tag type="success" size="small">_</el-tag>
    </div>
    <el-form-item label="Barcode" prop="barcode">
      <el-input
        v-model="ruleForm.barcode"
        maxlength="43"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item label="Nama Produk" prop="name">
      <el-input
        v-model="ruleForm.name"
        maxlength="50"
        show-word-limit
      ></el-input>
    </el-form-item>
    <el-form-item label="Diproduksi" prop="canManufacture">
      <el-switch v-model="ruleForm.canManufacture"></el-switch>
    </el-form-item>
    <el-form-item label="Satuan" prop="unit">
      <el-radio-group v-model="ruleForm.unit">
        <el-radio-button label="Piece" name="unit"></el-radio-button>
        <el-radio-button label="Bottle" name="unit"></el-radio-button>
        <el-radio-button label="Box" name="unit"></el-radio-button>
        <el-radio-button label="Gallon" name="unit"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Bobot" prop="weight">
      <el-input v-model="ruleForm.weight" type="number"></el-input>
    </el-form-item>
    <el-form-item label="Harga" prop="price">
      <el-input v-model="ruleForm.price" type="number"></el-input>
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
        barcode: '',
        canManufacture: true,
        modifiedDate: '',
        name: '',
        price: 1000,
        unit: '',
        weight: 0.04,
      },
      rules: {
        barcode: [
          {
            required: true,
            message: 'Silakan masukkan barcode.',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 43,
            message: 'Panjangnya harus 5 hingga 43',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: 'Silakan masukan nama produk',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 50,
            message: 'Panjangnya harus 5 hingga 50',
            trigger: 'blur',
          },
        ],
        unit: [
          {
            required: true,
            message: 'Silakan pilih satu unit',
            trigger: 'change',
          },
        ],
        canManufacture: [
          {
            required: true,
            message: 'Silakan tentukan apakah produk dapat diproduksi',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: 'Silakan masukan Harga produk.',
            trigger: 'blur',
          },
        ],
        weight: [
          {
            required: true,
            message: 'Silakan masukkan berat produk',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters('products', {
      products: 'list',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },
  methods: {
    ...mapActions('products', {
      addProduct: 'create',
    }),

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addProduct({ data: this.ruleForm })
          this.$message({
            message: 'Produk berhasil ditambahkan.',
            type: 'success',
          })
          this.$emit('completed')
        } else {
          this.$message({
            message: 'Terjadi kesalahan saat menambah Produk.',
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
