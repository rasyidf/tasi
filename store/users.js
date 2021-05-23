import createCRUDModule from 'vuex-crud'

const crudModule = createCRUDModule({
  resource: 'users',
  urlRoot: 'https://60a33b107c6e8b0017e26954.mockapi.io/api/v1/tasi/users',

  parseList(res) {
    const data = res.data

    return Object.assign({}, res, {
      data, // retrieve array from the json response
    })
  },
})
const state = () => crudModule.state

const { actions, mutations, getters } = crudModule

export { state, actions, mutations, getters }
