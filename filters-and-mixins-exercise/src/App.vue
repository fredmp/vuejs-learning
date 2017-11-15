<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters & Mixins</h1>
                <input v-model="text"/>
                <hr>
                <h3>Using filters:</h3>
                <p>{{ text | reverse }}</p>
                <p>{{ text | count }}</p>
                <hr>
                <h3>Using computed properties:</h3>
                <p>{{ stringWithLength }}</p>
                <p>{{ stringReversed }}</p>
                <hr>
                <h3>Filter with arguments</h3>
                <p>{{ text | filterWithArguments('arg1', 'arg2') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { textMixin } from './textMixin.js'
    export default {
      filters: {
        reverse (value) {
          return value.split("").reverse().join("");
        },
        filterWithArguments: function(value, arg1, arg2) {
          if (value.length < 1) {
            return '';
          }
          return `Value: ${value} - arg1: ${arg1} - arg2: ${arg2}`
        }
      },
      mixins: [
        textMixin
      ]
    }
</script>

<style>
</style>
