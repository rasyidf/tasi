<template>
  <el-form
    v-if="currentProducts"
    ref="ruleForm"
    style="margin-left: 16px; margin-right: 32px"
    :model="ruleForm"
    :rules="rules"
    label-position="left"
    label-width="130px"
  >
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.3em;
      "
    >
      <p>Sunting Produk</p>
      <el-tag size="small">{{ id }}</el-tag>
    </div>
    <el-form-item label="Barcode" prop="barcode">
      <el-input v-model="ruleForm.barcode"></el-input>
    </el-form-item>
    <el-form-item label="Nama Produk" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
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
            required: false,
            message: 'Please input Barcode',
            trigger: 'blur',
          },
          {
            min: 10,
            max: 11,
            message: 'Length should be 10 to 11',
            trigger: 'blur',
          },
        ],
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
        unit: [
          {
            required: true,
            message: 'Please select one unit',
            trigger: 'blur',
          },
        ],
        canManufacture: [
          {
            required: true,
            message: 'Please specify if its can be manufactured',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: 'Please input price',
            trigger: 'blur',
          },
        ],
        weight: [
          {
            required: true,
            message: 'Please input product weight',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters('products', {
      productById: 'byId',
      isLoading: 'isLoading',
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),

    currentProducts() {
      return this.productById(this.id)
    },
  },
  watch: {
    $route: 'fetchData',
  },

  created() {
    this.fetchData()
    Object.assign(this.ruleForm, this.currentProducts)
  },
  methods: {
    ...mapActions('products', {
      updateProduct: 'replace',
      fetchProduct: 'fetchSingle',
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateProduct({ id: this.id, data: this.ruleForm })
          this.$message({
            message: 'Informasi Produk berhasil diperbarui.',
            type: 'success',
          })
          this.$emit('completed')
          return true
        } else {
          this.$message({
            message: 'Terjadi kesalahan saat memperbarui Produk.',
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
      const data = this.fetchProduct({
        id: this.id,
      })
      return data
    },
  },
}
</script>
