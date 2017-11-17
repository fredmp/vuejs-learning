<template>
    <div>
      <p>Counter is: {{ doubleCounter }}</p>
      <p>Clicks: {{ stringCounter }}</p>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    // We use spread operator to allow declare other computed properties
    // Three dots is supported by installing babel-preset-stage-2 and adding it to babelrc
    computed: {
      ...mapGetters('counter', [
        'doubleCounter',
        'stringCounter'
      ])
    }
  }
</script>
