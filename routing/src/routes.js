// These resources are eager loaded
import Home from './components/Home.vue';
import Header from './components/Header.vue';

// Webpack Lazy Loading example:
// This is good to load resources only when we need them
// And also to increase the number of requests we are allowed to perform
// This will create a separate bundle for each resource
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
    path: '/user',
    components: {
      default: User,
      'header-bottom': Header
    },
    children: [
      { path: '', component: UserStart },
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
