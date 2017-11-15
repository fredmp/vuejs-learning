import Vue from 'vue'
import App from './App.vue'

Vue.filter('count', function(value) {
    if (value.length < 1) {
      return '';
    }
    return `${value} (${value.length})`;
});

Vue.mixin({
    created() {
        console.log('Global Mixin - Created Hook');
    }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
