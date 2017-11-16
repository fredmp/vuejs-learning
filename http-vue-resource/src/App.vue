<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" class="form-control" v-model="user.name">
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="text" class="form-control" v-model="user.email">
                </div>
                <button class="btn btn-primary" type="button" @click="submit">Submit</button>
                <hr>
                <button class="btn btn-primary" type="button" @click="fetchData">List</button>
                <br>
                <br>
                <ul class="list-group">
                  <li
                    class="list-group-item remove"
                    v-for="(u, index) in users"
                    @click="remove(index)">{{ u.name }} - {{ u.email }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          user: {
            name: '',
            email: ''
          },
          users: []
        }
      },
      methods: {
        submit () {
          this.$http.post('users.json', this.user).then(response => {
            console.log(response);
            this.user.name = '';
            this.user.email = '';
            this.fetchData ();
          }, error => {
            console.log(error);
          });
        },
        fetchData () {
          this.$http.get('users.json').then(response => {
            response.json().then(data => {
              this.users = [];
              if (data) {
                for (const key of Object.keys(data)) {
                  this.users.push(Object.assign({}, data[key], { id: key }));
                }
              }
            });
          }, error => {
            console.log(error);
          });
        },
        remove (index) {
          this.$http.delete(`users/${this.users[index].id}.json`).then(response => {
            console.log(response);
            this.users.splice(index, 1);
          }, error => {
            console.log(error);
          });
        }
      }
    }
</script>

<style>
  li.remove {
    cursor: pointer;
  }
</style>
