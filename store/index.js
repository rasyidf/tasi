export const actions = {
  nuxtServerInit({ dispatch, commit, app }, context) {
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      app.$axios.setToken(token)
    }
  },
}
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}
