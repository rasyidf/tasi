<template>
  <div class="flex">
    <el-card class="login-box">
      <p class="title">Login</p>
      <el-tag
        v-if="$auth.$state.redirect"
        style="margin-bottom: 16px"
        type="warning"
      >
        You have to login before accessing to
        <strong>{{ $auth.$state.redirect }}</strong>
      </el-tag>
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
          <el-button
            type="primary"
            autofocus
            style="width: 100%"
            @click="login"
          >
            Sign In
          </el-button>
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
      return msg
    },
  },
  methods: {
    async login() {
      this.error = null
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })

        this.$auth.setUser(response)
        // eslint-disable-next-line no-console
        console.log(this.$auth.user)
        this.$message({
          title: 'Logged In',
          message: "You're now logged in, redirecting to main site",
          duration: 3000,
          type: 'success',
        })
        this.$router.push('/')
      } catch (err) {
        this.error = err
        this.$message({
          title: 'Error',
          message: this.error,
          duration: 3000,
          type: 'error',
        })
      }
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
  background-color: #293146;
}
.flex .login-box {
  min-width: 40%;
  max-width: 50%;
}
.flex .title {
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
}
.el-card__body {
  padding: 20px !important;
}
</style>
