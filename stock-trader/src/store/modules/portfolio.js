const state = {
  funds: 10000,
  stocks: []
};

const mutations = {
  set (state, { funds, stocks }) {
    state.funds = funds;
    state.stocks = stocks;
  },
  buy (state, { stockId, stockPrice, quantity }) {
    const record = state.stocks.find(s => s.id === stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity
      });
    }
    state.funds -= stockPrice * quantity;
  },
  sell (state, { stockId, stockPrice, quantity }) {
    const record = state.stocks.find(s => s.id === stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
  }
};

const actions = {
  buy ({ commit }, order) {
    commit('buy', order);
  },
  sell ({ commit }, order) {
    commit('sell', order);
  }
};

const getters = {
  all: (state) => (allStocks) => {
    return state.stocks.map(stock => {
      const record = allStocks.find(s => s.id === stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        price: record.price,
        name: record.name
      };
    });
  },
  funds (state) {
    return state.funds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
