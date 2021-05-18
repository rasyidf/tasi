import axios from 'axios'

// initial state
const state = () => ({
  suppliers: [],
  suppliersPaginatedData: null,
  supplier: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null,
})

// getters
const getters = {
  supplierList: (state) => state.suppliers,
  suppliersPaginatedData: (state) => state.suppliersPaginatedData,
  supplier: (state) => state.supplier,
  isLoading: (state) => state.isLoading,
  isCreating: (state) => state.isCreating,
  isUpdating: (state) => state.isUpdating,
  createdData: (state) => state.createdData,
  updatedData: (state) => state.updatedData,

  isDeleting: (state) => state.isDeleting,
  deletedData: (state) => state.deletedData,
}

const actions = {
  async fetchAllSuppliers({ commit }, query = null) {
    let page = ''
    let search = ''
    if (query !== null) {
      page = query.page
      search = query.search
    }

    commit('setProductIsLoading', true)
    let url = `${process.env.VUE_APP_API_URL}suppliers?page=${page}`
    if (search === null) {
      url = `${url}?page=${page}`
    } else {
      url = `${process.env.VUE_APP_API_URL}suppliers/view/search?search=${search}&page=${page}`
    }

    await axios
      .get(url)
      .then((res) => {
        const suppliers = res.data.data.data
        commit('setSuppliers', suppliers)
        const pagination = {
          total: res.data.data.total, // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when users clicks on some page number).
          total_pages: res.data.data.last_page, // total pages in record
        }
        res.data.data.pagination = pagination
        commit('setSuppliersPaginated', res.data.data)
        commit('setProductIsLoading', false)
      })
      .catch((err) => {
        console.log('error', err)
        commit('setProductIsLoading', false)
      })
  },

  async fetchDetailProduct({ commit }, id) {
    commit('setProductIsLoading', true)
    await axios
      .get(`${process.env.VUE_APP_API_URL}suppliers/${id}`)
      .then((res) => {
        commit('setProductDetail', res.data.data)
        commit('setProductIsLoading', false)
      })
      .catch((err) => {
        console.log('error', err)
        commit('setProductIsLoading', false)
      })
  },

  async storeProduct({ commit }, supplier) {
    commit('setProductIsCreating', true)
    await axios
      .post(`${process.env.VUE_APP_API_URL}suppliers`, supplier)
      .then((res) => {
        commit('saveNewSuppliers', res.data.data)
        commit('setProductIsCreating', false)
      })
      .catch((err) => {
        console.log('error', err)
        commit('setProductIsCreating', false)
      })
  },

  async updateProduct({ commit }, supplier) {
    commit('setProductIsUpdating', true)
    commit('setProductIsUpdating', true)
    await axios
      .post(
        `${process.env.VUE_APP_API_URL}suppliers/${supplier.id}?_method=PUT`,
        supplier
      )
      .then((res) => {
        commit('saveUpdatedProduct', res.data.data)
        commit('setProductIsUpdating', false)
      })
      .catch((err) => {
        console.log('error', err)
        commit('setProductIsUpdating', false)
      })
  },

  async deleteProduct({ commit }, id) {
    commit('setProductIsDeleting', true)
    await axios
      .delete(`${process.env.VUE_APP_API_URL}suppliers/${id}`)
      .then((res) => {
        commit('setDeleteProduct', res.data.data.id)
        commit('setProductIsDeleting', false)
      })
      .catch((err) => {
        console.log('error', err)
        commit('setProductIsDeleting', false)
      })
  },

  updateProductInput({ commit }, e) {
    commit('setProductDetailInput', e)
  },
}

// mutations
const mutations = {
  setSuppliers: (state, suppliers) => {
    state.suppliers = suppliers
  },

  setSuppliersPaginated: (state, suppliersPaginatedData) => {
    state.suppliersPaginatedData = suppliersPaginatedData
  },

  setProductDetail: (state, supplier) => {
    state.supplier = supplier
  },

  setDeleteProduct: (state, id) => {
    state.suppliersPaginatedData.data.filter((x) => x.id !== id)
  },

  setProductDetailInput: (state, e) => {
    const supplier = state.supplier
    supplier[e.target.name] = e.target.value
    state.supplier = supplier
  },

  saveNewSuppliers: (state, supplier) => {
    state.suppliers.unshift(supplier)
    state.createdData = supplier
  },

  saveUpdatedProduct: (state, supplier) => {
    state.suppliers.unshift(supplier)
    state.updatedData = supplier
  },

  setProductIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setProductIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setProductIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setProductIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
