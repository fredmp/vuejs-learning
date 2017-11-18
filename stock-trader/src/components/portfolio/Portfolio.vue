<template lang="html">
  <div class="">
    <stock v-for="stock in stocks" :stock="stock"></stock>
  </div>
</template>

<script>
  import Stock from './Stock.vue';
  export default {
    computed: {
      stocks () {
        return this.$store.getters['portfolio/all'](
          this.$store.getters['stocks/all']
        );
      }
    },
    components: {
      Stock
    }
  }
</script>

<style lang="css">
</style>
