<template>
    <div>
      <p>Loaded user: {{ userId }}</p>
      <router-link
        :to="link">Edit</router-link>
    </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        link: {
          name: 'userEdit',
          params: { id: this.$route.params.id },
          query: { q: 100, locale: 'pt-BR' },
          hash: '#anchor'
        },
        userId: this.$route.params.id
      }
    },
    beforeRouteEnter (to, from, next) {
      // Executes before component is created - has no access to component data
      console.log('beforeRouteEnter');
      next();
    }
  }
</script>
