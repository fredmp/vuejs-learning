import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://vuejs-learning-59349.firebaseio.com/'
// axios.defaults.headers.common['Authorization'] = 'fasfdsa'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  console.log(store)
  if (store.getters.auth) {
    const separator = config.url.includes('?') ? '&' : '?'
    config.url = `${config.url}${separator}auth=${store.getters.auth.idToken}`
  }
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

router.beforeEach((to, from, next) => {
  if (!store.getters.authenticated) {
    store.dispatch('tryAutoLogin').then(() => {
      next()
    });
  } else {
    next()
  }
})

// axios.interceptors.request.eject(reqInterceptor)
// axios.interceptors.response.eject(resInterceptor)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
