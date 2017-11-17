<template>
    <div>
      <h3>Edit the User</h3>
      <p>q: {{ $route.query.q }}</p>
      <p>locale: {{ $route.query.locale }}</p>
      <button class="btn btn-primary" @click="confirmed = true">Confirm</button>
      <div style="height: 1200px">Some vertical space</div>
      <p id="anchor">Test anchor</p>
    </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        confirmed: false
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.confirmed) {
        next();
      } else {
        if (confirm('Are you sure?')) {
          next();
        } else {
          next(false);
        }
      }
    }
  }
</script>
