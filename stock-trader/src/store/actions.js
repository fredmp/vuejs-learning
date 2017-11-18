import Vue from 'vue';

export const load = ({ commit }) => {
  Vue.http.get('data.json')
    .then(response => response.json())
    .then(data => {
      if (data) {
        const portfolio = {
          funds: data.funds,
          stocks: data.portfolio ? data.portfolio : []
        };
        commit('stocks/set', data.stocks);
        commit('portfolio/set', portfolio);
      }
    });
};
