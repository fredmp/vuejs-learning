<template>
    <div>
        <button class="btn btn-primary" @click="increment">Increment</button>
        <button class="btn btn-primary" @click="decrement">Decrement</button>
        <button class="btn btn-primary" @click="incrementBy({ by: 4, duration: 4000 })">Increment by 2</button>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions('counter', [
        'increment',
        'decrement',
        'incrementBy'
      ])
    },
    mounted () {
      console.log(this.$store);
    }
    // We could also use the action with: this.$store.dispatch('increment')
  }
</script>
