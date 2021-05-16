<template>
  <div class="flex">
    <el-card class="login-box">
      <p class="title">Login</p>
      <el-alert v-if="$auth.$state.redirect" show>
        You have to login before accessing to
        <strong>{{ $auth.$state.redirect }}</strong>
      </el-alert>
      <busy-overlay />
      <el-form @keydown.enter="login">
        <el-form-item>
          <el-input
            ref="username"
            v-model="username"
            placeholder="Deine Nutzername"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="Dein Passwort"
          />
        </el-form-item>

        <div class="text-center">
          <el-button variant="primary" block @click="login"> Login </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'full',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    },
    errorMessage() {
      const { error } = this
      if (!error || typeof error === 'string') {
        return error
      }
      let msg = ''
      if (error.message) {
        msg += error.message
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, '')
          .replace(/:/g, ': ')
          .replace(/,/g, ' ')})`
      }
      if (msg !== '') {
        const h = this.$createElement

        this.$notify({
          title: 'Title',
          message: h('i', { style: 'color: teal' }, msg),
          duration: 0,
        })
      }
      return msg
    },
  },
  methods: {
    login() {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((err) => {
          this.error = err.response?.data
        })
    },
  },
}
</script>

<style>
.flex {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  min-width: 30%;
  max-width: 50%;
}
.title {
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
}
</style>
