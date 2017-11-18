<template lang="html">
  <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <router-link
        :to="{ name: 'home' }"
        class="navbar-brand">Stock Trader
      </router-link>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <router-link
          :to="{ name: 'portfolio' }"
          activeClass="active"
          tag="li"><a>Portfolio</a>
        </router-link>
        <router-link
          :to="{ name: 'stocks' }"
          activeClass="active"
          tag="li"><a>Stocks</a>
        </router-link>
      </ul>
      <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#" @click="endDay">End Day</a></li>
        <li class="dropdown"
          :class="{ open: isDropdownOpen }"
          @click="isDropdownOpen = !isDropdownOpen">
          <a
            href="#"
            class="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false">Save & Load<span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#" @click="save">Save Data</a></li>
            <li><a href="#" @click="load">Load Data</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>
  export default {
    data () {
      return {
        isDropdownOpen: false
      }
    },
    computed: {
      stocks () {
        return this.$store.getters['stocks/all'];
      },
      funds () {
        return this.$store.getters['portfolio/funds'];
      },
      portfolio () {
        return this.$store.getters['portfolio/all'](this.stocks);
      }
    },
    methods: {
      endDay () {
        this.$store.dispatch('stocks/randomize');
      },
      save () {
        const data = {
          funds: this.funds,
          portfolio: this.portfolio,
          stocks: this.stocks
        };
        this.$http.put('data.json', data);
      },
      load () {
        this.$store.dispatch('load');
      }
    }
  }
</script>

<style lang="css">
</style>
