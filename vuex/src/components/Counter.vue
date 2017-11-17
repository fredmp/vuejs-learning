<template>
    <div>
        <button class="btn btn-primary" @click="increment">Increment</button>
        <button class="btn btn-primary" @click="decrement">Decrement</button>
    </div>
</template>

<script>
  // AnotherCounter show how to use mapMutations to improve the code
  export default {
    methods: {
      increment() {
        this.$store.commit('counter/increment');
      },
      decrement() {
        this.$store.commit('counter/decrement');
      }
    }
  }
</script>
