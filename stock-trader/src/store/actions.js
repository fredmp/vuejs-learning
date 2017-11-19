import axios from 'axios';

export const load = ({ commit }) => {
  axios.get('/data.json').then(response => {
    console.log(response);
    if (response.data) {
      const portfolio = {
        funds: response.data.funds,
        stocks: response.data.portfolio ? response.data.portfolio : []
      };
      commit('stocks/set', response.data.stocks);
      commit('portfolio/set', portfolio);
    }
  }).catch(error => console.log(error));
};
