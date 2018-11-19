import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//Helper functions

function generateToday() {
  const date = new Date();
  return formatDate(date)
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

//Actual store

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    selectedDate: generateToday()
  },

  mutations: {
    login(state, user) {
      state.user = user;
      state.loggedIn = true;
    },
    logout(state) {
      state.user = {};
      state.loggedIn = false;
    },
    goToYesterday(state) {
      let date = new Date(state.selectedDate);
      date.setDate(date.getDate() - 1)
      state.selectedDate = formatDate(date);
    },
    goToTomorrow(state) {
      let date = new Date(state.selectedDate);
      date.setDate(date.getDate() + 1)
      state.selectedDate = formatDate(date);
    }
  },

  actions: {
    login(context, payload) {
      context.commit('login', payload);
    },
    logout(context) {
      context.commit('logout');
    },
    goToYesterday(context) {
      context.commit('goToYesterday');
    },
    goToTomorrow(context) {
      context.commit('goToTomorrow');
    }

  }
})
