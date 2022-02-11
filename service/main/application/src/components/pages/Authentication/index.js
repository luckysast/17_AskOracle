import Axios from 'axios'
import router from '@/router'
const OracleAPI = `http://${window.location.hostname}:3001`

export default {
  user: { authenticated: false, name: '' },

  authenticate (context, credentials, redirect) {
    Axios.post(`${OracleAPI}/api/v1/auth`, credentials)
      .then(({data}) => {
        context.$cookie.set('token', data.token, '1D')
        context.validLogin = true
        this.user.authenticated = true
        localStorage.setItem('user', JSON.stringify(data.user))

        if (redirect) router.push(redirect)
      }).catch(({response: {data}}) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  signup (context, credentials, redirect) {
    Axios.post(`${OracleAPI}/api/v1/signup`, credentials)
      .then(() => {
        context.validSignUp = true

        this.authenticate(context, credentials, redirect)
      }).catch(({response: {data}}) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  signout (context, redirect) {
    context.$cookie.delete('token')
    this.user.authenticated = false

    if (redirect) router.push(redirect)
  },

  checkAuthentication () {
    const token = document.cookie
    this.user.authenticated = !!token
  },

  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
