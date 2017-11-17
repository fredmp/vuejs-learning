import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach');
  console.log('TO: ', to);
  console.log('FROM: ', from);
  console.log('NEXT: ', next);

  // Example using route meta info
  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    // Do something....
    console.log('record.meta.requiresAuthentication');
    next();
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
