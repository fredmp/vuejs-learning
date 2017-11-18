<template lang="html">
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-popover:tooltip="'Insufficient Funds'"
            :class="{ 'danger-quantity': insufficientFunds }"
            v-model.number="quantity">
        </div>
        <tooltip v-show="insufficientFunds"/>
        <div class="pull-right">
          <button
            :class="[ 'btn', insufficientFunds ? 'btn-danger' : 'btn-success' ]"
            :disabled="preventBuy"
            @click="buy">Buy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  data () {
    return {
      quantity: 0
    }
  },
  computed: {
    funds () {
      return this.$store.getters['portfolio/funds'];
    },
    insufficientFunds () {
      return this.quantity * this.stock.price > this.funds;
    },
    preventBuy () {
      return this.insufficientFunds || this.quantity <= 0 || !Number.isInteger(this.quantity);
    }
  },
  methods: {
    buy () {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.$store.dispatch('portfolio/buy', order);
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
  div[data-popover="tooltip"] {
    background: #444;
    color: #f9f9f9;
    font-size: 13px;
    line-height: 1.6;
    margin: 5px;
    opacity: 0.8;
    text-align: center;
  }
</style>
