import Vue from 'vue';
import Vuex from 'vuex';
import getters from '@/store/getters.js';
import mutations from '@/store/mutations.js';
import actions from '@/store/actions.js'

Vue.use(Vuex);

//Helper functions

function formatDate(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

const defaultUserData = {
  gender: 'male',
  height: 178,
  weight: 74,
  age: 28,
  activityLevel: 'sedentary'
}

//Actual store

export default new Vuex.Store({
  state: {
    user: {},
    userData: defaultUserData,
    loggedIn: false,
    selectedDate: formatDate(new Date()),
    dailyEntries: [],
    unsubscribe: function () {  }
  },

  getters: getters,
  mutations: mutations,
  actions: actions
});

//export date formatting function and default userdata so mutations can use them

export { formatDate, defaultUserData };