import createCRUDModule, { client } from 'vuex-crud'

client.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('auth._token.local')
    config.headers = {
      Authorization: token || '',
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

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
