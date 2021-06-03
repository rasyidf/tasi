<template>
  <el-form
    ref="ruleForm"
    style="margin-left: 8px; margin-right: 32px"
    :model="ruleForm"
    :rules="rules"
    label-width="130px"
    class="demo-ruleForm"
  >
    <el-form-item label="Barcode" prop="barcode">
      <el-input v-model="ruleForm.barcode"></el-input>
    </el-form-item>
    <el-form-item label="Product name" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Manufactured" prop="canManufacture">
      <el-switch v-model="ruleForm.canManufacture"></el-switch>
    </el-form-item>
    <el-form-item label="Unit" prop="unit">
      <el-radio-group v-model="ruleForm.unit">
        <el-radio-button label="Piece" name="unit"></el-radio-button>
        <el-radio-button label="Bottle" name="unit"></el-radio-button>
        <el-radio-button label="Box" name="unit"></el-radio-button>
        <el-radio-button label="Gallon" name="unit"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Weight" prop="weight">
      <el-input v-model="ruleForm.weight" type="number"></el-input>
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model="ruleForm.price" type="number"></el-input>
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
            trigger: 'change',
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
        } else {
          this.$message({
            message: 'Error Updating Product.',
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
