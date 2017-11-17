<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Vuex</h1>
                <result></result>
                <another-result></another-result>
                <hr>
                <counter></counter>
                <another-counter></another-counter>
                <br>
                <br>
                <input type="text" v-model="value">
                <p>{{ value }}</p>
            </div>
        </div>
    </div>
</template>

<script>
  import Counter from './components/Counter.vue';
  import Result from './components/Result.vue';
  import AnotherCounter from './components/AnotherCounter.vue';
  import AnotherResult from './components/AnotherResult.vue';

  export default {

    // Computed with get and set to be used by v-model
    computed: {
      value: {
        get () {
          return this.$store.getters.value;
        },
        set (value) {
          this.$store.dispatch('value', value);
        }
      }
    },
    components: {
      Counter,
      Result,
      AnotherCounter,
      AnotherResult
    }
  }
</script>
