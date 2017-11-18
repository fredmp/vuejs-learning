import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Popover  from 'vue-js-popover'

import App from './App.vue';
import { routes } from './routes';
import store from './store/store';

Vue.use(Popover, { tooltip: true });
Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.root = 'https://vuejs-learning-59349.firebaseio.com/';

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
