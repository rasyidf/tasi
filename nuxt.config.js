export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tasi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/auth-next'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'id',
      theme_color: '#FFFFFF',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  router: {
    linkExactActiveClass: 'active',
    // middleware: ['auth'],
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: 'result.accessToken',
  //         // required: true,
  //         type: 'Bearer',
  //         maxAge: 1800,
  //       },
  //       user: {
  //         property: 'result',
  //       },
  //       endpoints: {
  //         login: {
  //           url: 'https://localhost:44327/api/users/authenticate',
  //           method: 'post',
  //         },
  //         user: {
  //           url: 'https://localhost:44327/api/users/profile',
  //           method: 'get',
  //         },
  //         logout: false,

  //         home: '/',
  //       },
  //     },
  //   },
  // },
}
