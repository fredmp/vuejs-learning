<template lang="html">
  <div class="">
    <stock v-for="stock in stocks" :stock="stock"></stock>
  </div>
</template>

<script>
  import Stock from './Stock.vue';
  export default {
    components: {
      Stock
    },
    computed: {
      stocks () {
        return this.$store.getters['stocks/all'];
      }
    }
  }
</script>

<style lang="css">
</style>
