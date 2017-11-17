export const value = ({ commit }, payload) => {
  setTimeout(() => {
    commit('value', payload);
  }, 500);
};

// This file can be used to hold actions that don't belong to any specific module
// We can have how many actions we want
// export const action2 = ({ commit }, payload) => {};
