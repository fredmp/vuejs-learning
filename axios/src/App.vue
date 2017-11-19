<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    watch: {
      authenticated: function (value) {
        if (!value) {
          this.$router.replace('/signin');
        }
      }
    },
    computed: {
      authenticated () {
        return this.$store.getters.authenticated;
      }
    }
  }
</script>

<style>
  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
