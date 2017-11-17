const state = {
  counter: 0
};

const getters = {
  doubleCounter: state => {
    return state.counter * 2;
  },
  stringCounter: state => {
    return `${state.counter} clicks`;
  },
};

const mutations = {
  increment: (state, payload) => {
    if (!payload) {
      payload = 1;
    }
    state.counter += payload;
  },
  decrement: state => {
    state.counter--;
  }
};

const actions = {
  // We can receive the context...
  increment: context => {
    // We can run async code here
    setTimeout(() => {
      context.commit('increment');
    }, 1000);
  },
  // ...Or only what we need
  decrement: ({ commit }) => {
    // We can run async code here
    setTimeout(() => {
      commit('decrement');
    }, 1000);
  },
  incrementBy: ({ commit }, { by, duration }) => {
    if (!duration) {
      duration = 0;
    }
    setTimeout(() => {
      commit('increment', by);
    }, duration);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
