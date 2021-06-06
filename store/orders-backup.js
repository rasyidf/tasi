import axios from 'axios'

// initial state
const state = () => ({
  orders: [],
  ordersPaginatedData: null,
  order: null,
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
  orderList: (state) => state.orders,
  ordersPaginatedData: (state) => state.ordersPaginatedData,
  order: (state) => state.order,
  isLoading: (state) => state.isLoading,
  isCreating: (state) => state.isCreating,
  isUpdating: (state) => state.isUpdating,
  createdData: (state) => state.createdData,
  updatedData: (state) => state.updatedData,

  isDeleting: (state) => state.isDeleting,
  deletedData: (state) => state.deletedData,
}

// actions
const actions = {
  async fetchAllOrders({ commit }, query = null) {
    let page = ''
    let search = ''
    if (query !== null) {
      page = query.page
      search = query.search
    }

    commit('setOrderIsLoading', true)
    let url = `${process.env.VUE_APP_API_URL}orders?page=${page}`
    if (search === null) {
      url = `${url}?page=${page}`
    } else {
      url = `${process.env.VUE_APP_API_URL}orders/view/search?search=${search}&page=${page}`
    }

    await axios
      .get(url)
      .then((res) => {
        const orders = res.data.data.data
        commit('setOrders', orders)
        const pagination = {
          total: res.data.data.total, // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when users clicks on some page number).
          total_pages: res.data.data.last_page, // total pages in record
        }
        res.data.data.pagination = pagination
        commit('setOrdersPaginated', res.data.data)
        commit('setOrderIsLoading', false)
      })
      .catch((err) => {
        console.log('error', err)
        commit('setOrderIsLoading', false)
      })
  },

  async fetchDetailOrder({ commit }, id) {
    commit('setOrderIsLoading', true)
    await axios
      .get(`${process.env.VUE_APP_API_URL}orders/${id}`)
      .then((res) => {
        commit('setOrderDetail', res.data.data)
        commit('setOrderIsLoading', false)
      })
      .catch((err) => {
        console.debug('error', err)
        commit('setOrderIsLoading', false)
      })
  },

  async storeOrder({ commit }, order) {
    commit('setOrderIsCreating', true)
    await axios
      .post(`${process.env.VUE_APP_API_URL}orders`, order)
      .then((res) => {
        commit('saveNewOrders', res.data.data)
        commit('setOrderIsCreating', false)
      })
      .catch((err) => {
        console.debug('error', err)
        commit('setOrderIsCreating', false)
      })
  },

  async updateOrder({ commit }, order) {
    commit('setOrderIsUpdating', true)
    commit('setOrderIsUpdating', true)
    await axios
      .post(
        `${process.env.VUE_APP_API_URL}orders/${order.id}?_method=PUT`,
        order
      )
      .then((res) => {
        commit('saveUpdatedOrder', res.data.data)
        commit('setOrderIsUpdating', false)
      })
      .catch((err) => {
        console.debug('error', err)
        commit('setOrderIsUpdating', false)
      })
  },

  async deleteOrder({ commit }, id) {
    commit('setOrderIsDeleting', true)
    await axios
      .delete(`${process.env.VUE_APP_API_URL}orders/${id}`)
      .then((res) => {
        commit('setDeleteOrder', res.data.data.id)
        commit('setOrderIsDeleting', false)
      })
      .catch((err) => {
        console.debug('error', err)
        commit('setOrderIsDeleting', false)
      })
  },

  updateOrderInput({ commit }, e) {
    commit('setOrderDetailInput', e)
  },
}

// mutations
const mutations = {
  setOrders: (state, orders) => {
    state.orders = orders
  },

  setOrdersPaginated: (state, ordersPaginatedData) => {
    state.ordersPaginatedData = ordersPaginatedData
  },

  setOrderDetail: (state, order) => {
    state.order = order
  },

  setDeleteOrder: (state, id) => {
    state.ordersPaginatedData.data.filter((x) => x.id !== id)
  },

  setOrderDetailInput: (state, e) => {
    const order = state.order
    order[e.target.name] = e.target.value
    state.order = order
  },

  saveNewOrders: (state, order) => {
    state.orders.unshift(order)
    state.createdData = order
  },

  saveUpdatedOrder: (state, order) => {
    state.orders.unshift(order)
    state.updatedData = order
  },

  setOrderIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setOrderIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setOrderIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setOrderIsDeleting(state, isDeleting) {
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
