import Vue from 'vue';
import VueRouter from 'vue-router';
import Popover  from 'vue-js-popover'
import axios from 'axios';

import App from './App.vue';
import { routes } from './routes';
import store from './store/store';

axios.defaults.baseURL = 'https://vuejs-learning-59349.firebaseio.com/'

Vue.use(Popover, { tooltip: true });
Vue.use(VueRouter);

Vue.filter('currency', (value) => {
  return `\$${value.toLocaleString()}`;
});

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
