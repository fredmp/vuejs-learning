import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import authAxios from './axios-auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authData: {},
    userData: {}
  },
  mutations: {
    setAuth (state, { localId, idToken, expiresIn, skipLocalStorage }) {
      state.authData = { localId, idToken };
      if (!skipLocalStorage) {
        const expiresAt = new Date(new Date().getTime() + expiresIn * 1000);
        localStorage.setItem('expiresAt', expiresAt);
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('localId', localId);
      }
    },
    setUser (state, userData) {
      state.userData = userData;
    },
    logout (state) {
      state.authData = {};
      state.userData = {};
      localStorage.removeItem('idToken');
      localStorage.removeItem('localId');
      localStorage.removeItem('expiresAt');
    }
  },
  actions: {
    tryAutoLogin ({ commit }) {
      return new Promise((resolve, reject) => {
        const idToken = localStorage.getItem('idToken');
        const localId = localStorage.getItem('localId');
        const expiresAt = localStorage.getItem('expiresAt');
        const now = new Date();
        if (!idToken || !expiresAt || now >= expiresAt) {
          resolve();
          return;
        }
        console.log('tryAutoLogin');
        commit('setAuth', { localId, idToken, skipLocalStorage: true });
        resolve();
      });
    },
    setLogoutTimer ({ commit }, expiresIn) {
      setTimeout(() => {
        commit('logout');
      }, expiresIn * 1000);
    },
    signup ({ commit, dispatch }, userData) {
      return new Promise((resolve, reject) => {
        authAxios.post('/signupNewUser?key=AIzaSyBqzSAtV1pmMklTVeDSFPG2hE9d4P7TpcQ', {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true
        }).then(response => {
          console.log(response);
          commit('setAuth', response.data);
          userData.id = response.data.localId;
          delete userData.password;
          dispatch('storeUser', userData).then(() => {
            dispatch('setLogoutTimer', response.data.expiresIn).then(() => {
              resolve();
            });
          });
        }).catch(error => {
          console.log(error.request);
          reject();
        });
      });
    },
    login ({ commit, dispatch }, authData) {
      return new Promise((resolve, reject) => {
        authData.returnSecureToken = true;
        authAxios.post(
          '/verifyPassword?key=AIzaSyBqzSAtV1pmMklTVeDSFPG2hE9d4P7TpcQ',
          authData
        ).then(response => {
          console.log(response);
          commit('setAuth', response.data);
          dispatch('setLogoutTimer', response.data.expiresIn).then(() => {
            resolve();
          });
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        resolve();
      });
    },
    storeUser ({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios.post('/users.json', userData).then(response => {
          console.log(response);
          commit('setUser', userData);
          resolve();
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
    },
    fetchUser ({ commit }, userId) {
      return new Promise((resolve, reject) => {
        axios.get(`/users.json?orderBy="id"&equalTo="${userId}"`).then(response => {
          console.log(response)
          const data = response.data;
          if (data) {
            const key = Object.keys(data)[0];
            const user = data[key]
            commit('setUser', user);
            resolve();
          }
        }).catch(error => {
          console.log(error.request);
          reject();
        })
      });
    }
  },
  getters: {
    user (state) {
      return state.userData;
    },
    auth (state) {
      return state.authData;
    },
    authenticated (state) {
      return !!state.authData.idToken;
    }
  }
})
