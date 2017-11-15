<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters & Mixins</h1>
                <p>{{ text | to-uppercase | toLowercase }}</p>
                <hr>
                <button @click="fruits.push('Berries')">Add Item</button>
                <input v-model="filterText">
                <ul>
                  <li v-for="fruit in filteredFruits">{{ fruit }}</li>
                </ul>
                <list></list>
            </div>
        </div>
    </div>
</template>

<script>
    import List from './List.vue';
    import { fruitMixin } from './fruitMixin.js';
    export default {
      data () {
        return {
          text: '   Some text   '
        }
      },
      filters: {
        'to-uppercase'(value) {
          return value.toUpperCase();
        },
        trim(value) {
          return value.trim();
        }
      },
      components: {
        List
      },
      mixins: [
        fruitMixin
      ],
      created () {
        console.log('Created:  App.vue');
      }
    }
</script>

<style>

</style>
