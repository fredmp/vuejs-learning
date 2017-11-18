<template lang="html">
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-xs-12">
        <transition
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
          mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  components: {
    appHeader: Header
  },
  created () {
    this.$store.dispatch('stocks/init');
  }
}
</script>

<style lang="css">
  body {
    padding: 30px;
  }
</style>
