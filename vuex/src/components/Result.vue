<template>
    <p>Counter is: {{ myCounter }}</p>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters('counter', {
      myCounter: 'doubleCounter'
    })
  }
</script>
