<template lang="html">
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-popover:tooltip="'Insufficient Quantity'"
            :class="{ 'danger-quantity': insufficientQuantity }"
            v-model.number="quantity">
        </div>
        <tooltip v-show="insufficientQuantity"/>
        <div class="pull-right">
          <button
            :class="[ 'btn', insufficientQuantity ? 'btn-danger' : 'btn-info' ]"
            :disabled="preventSell"
            @click="sell">Sell
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props: ['stock'],
    data () {
      return {
        quantity: 0
      }
    },
    computed: {
      insufficientQuantity () {
        return this.quantity > this.stock.quantity;
      },
      preventSell () {
        return this.insufficientQuantity || this.quantity <= 0 || !Number.isInteger(this.quantity);
      }
    },
    methods: {
      sell () {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };
        this.$store.dispatch('portfolio/sell', order);
        this.quantity = 0;
      }
    }
  }
</script>

<style lang="css" scoped>
  .danger-quantity {
    border: 1px solid #d9534f;
  }
  .danger-message {
    color: #d9534f;
  }
  .panel-footer {
    background-color: white;
  }
</style>
