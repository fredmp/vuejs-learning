// These resources are eager loaded
import Home from './components/Home.vue';
import Header from './components/Header.vue';

// Webpack Lazy Loading example:
// This is good to load resources only when we need them
// And also to increase the number of requests we are allowed to perform
// This will create a separate bundle for each resource

// Important: In newer version of webpack this code is nicer
// Check here: https://router.vuejs.org/en/advanced/lazy-loading.html

const User = resolve => {
  require.ensure(['./components/user/User.vue'], () => {
    resolve(require('./components/user/User.vue'));
  });
};

// Same lazy loading but grouped by 'user'
// This will generate a bundle for each group
const UserStart = resolve => {
  require.ensure(['./components/user/UserStart.vue'], () => {
    resolve(require('./components/user/UserStart.vue'));
  }, 'user');
};
const UserEdit = resolve => {
  require.ensure(['./components/user/UserEdit.vue'], () => {
    resolve(require('./components/user/UserEdit.vue'));
  }, 'user');
};
const UserDetail = resolve => {
  require.ensure(['./components/user/UserDetail.vue'], () => {
    resolve(require('./components/user/UserDetail.vue'));
  }, 'user');
};

// Instead of a redirect to home the last route (*) should point to a NotFoundComponent
// Then in the server we can configure 404 to return index.html
// There are good examples on https://router.vuejs.org/en/essentials/history-mode.html

export const routes = [
  {
    path: '',
    name: 'home',
    components: {
      default: Home,
      'header-top': Header
    }
  },
  {
    path: '/home/:message',
    name: 'homeWithMessage',
    props: true, // Allows to send a parameter as a component props
    component: Home
  },
  {
    path: '/user',
    components: {
      default: User,
      'header-bottom': Header
    },
    children: [
      { path: '', component: UserStart, meta: { requiresAuthentication: true } },
      { path: ':id', component: UserDetail },
      {
        path: ':id/edit',
        component: UserEdit,
        name: 'userEdit',
        beforeEnter: (to, from, next) => {
          console.log('beforeEnter');
          next();
        }
      }
    ]
  },
  { path: '/redirect-me', redirect: { name: 'home' } },
  { path: '*', redirect: '/' }
];
