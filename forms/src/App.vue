<template>
    <div class="container">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                  <h1>Data</h1>
                  <hr>
                  <app-full-name v-model="fullName"></app-full-name>
                  <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        class="form-control"
                        placeholder="Email"
                        v-model="email">
                  </div>
                  <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        type="text"
                        id="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="password">
                  </div>
                  <div class="form-group">
                      <label for="storeData">
                          <input
                            type="checkbox"
                            id="storeData"
                            v-model="storeData"> Store in Database?
                      </label>
                  </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button
                      class="btn btn-primary"
                      @click.prevent="submit">Submit
                    </button>
                </div>
            </div>
        </form>
        <hr>
        <div class="row" v-if="submitted">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Full Name: {{ fullName }}</p>
                        <p>Mail: {{ email }}</p>
                        <p>Password: {{ password }}</p>
                        <p>Store in Database?: {{ storeData }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FullName from './FullName.vue';
    export default {
      data () {
        return {
          fullName: 'Initial Name',
          email: '',
          password: '',
          storeData: true,
          submitted: false
        }
      },
      methods: {
        submit () {
          this.submitted = true
        }
      },
      components: {
        appFullName: FullName
      }
    }
</script>

<style>
</style>
