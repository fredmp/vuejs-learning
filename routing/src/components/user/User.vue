<template>
    <div>
      <h1>The User Page</h1>
      <hr>
      <router-view></router-view>
      <br>
      <button @click="navigateToHome" class="btn btn-primary">Go To Home</button>
    </div>

</template>

<script>
  export default {
    methods: {
      navigateToHome () {
        this.$router.push({ name: 'home' });
      }
    }
  }
</script>
