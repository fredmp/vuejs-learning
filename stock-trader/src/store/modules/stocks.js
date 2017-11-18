import stocks from '../../data/stocks';

const state = {
  stocks: []
};

const mutations = {
  set (state, stocks) {
    state.stocks = stocks;
  },
  randomize (state) {
    console.log('mutations/randomize');
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (0.5 + Math.random()));
    });
  }
};

const actions = {
  init: ({ commit }) => {
    commit('set', stocks);
  },
  randomize: ({ commit }) => {
    console.log('actions/randomize');
    commit('randomize');
  }
};

const getters = {
  all: state => {
    return state.stocks;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
