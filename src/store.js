import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import db from '@/main.js';



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
    unsubscribe: function () { }
  },

  getters: {
    totalKcal: state => {
      function reducer(totalKcal, currentEntry) {
        if (currentEntry.type === 'food') {
          return totalKcal + (currentEntry.nutrition.kcal.value * currentEntry.quantity * 0.01);
        } else if (currentEntry.type === 'activity') {
          return totalKcal - (currentEntry.kcal * currentEntry.quantity / 60);
        }
      }
      return state.dailyEntries.reduce(reducer, 0);
    },
    bmr: state => {
      if (state.userData.gender === 'male') {
        return Math.round((state.userData.weight * 10) + (6.25 * state.userData.height) - (5 * state.userData.age) + 5)
      } else {
        return Math.round((state.userData.weight * 10) + (6.25 * state.userData.height) - (5 * state.userData.age) - 161)
      }

    },
    tdee: (state, getters) => {
      const activityLevelConstants = {
        sedentary: 1.2,
        moderate: 1.375,
        high: 1.7
      }
      return Math.round(activityLevelConstants[state.userData.activityLevel] * getters.bmr)
    },
    proteinTarget: (state, getters) => {
      const proteinRatio = 0.2;
      const proteinKcal = getters.tdee * proteinRatio;
      const proteinGrams = proteinKcal / 4;
      return proteinGrams ? proteinGrams.toFixed(1) : 0;
    },

    totalProtein: state => {
      function reducer(totalProtein, currentEntry) {
        if (currentEntry.type === 'food') {
          return totalProtein + (currentEntry.nutrition.prot.value * currentEntry.quantity * 0.01);
        } else {
          return totalProtein
        }
      }
      return state.dailyEntries ? state.dailyEntries.reduce(reducer, 0).toFixed(1) : 0
    },

    carbsTarget: (state, getters) => {
      const carbRatio = 0.4;
      const carbKcal = getters.tdee * carbRatio;
      const carbGrams = carbKcal / 4;
      return carbGrams ? carbGrams.toFixed(1) : 0;
    },

    totalCarbs: state => {
      function reducer(totalCarbs, currentEntry) {
        if (currentEntry.type === 'food') {
          return totalCarbs + (currentEntry.nutrition.kolh.value * currentEntry.quantity * 0.01);
        } else {
          return totalCarbs
        }
      }
      return state.dailyEntries ? state.dailyEntries.reduce(reducer, 0).toFixed(1) : 0
    },

    fatTarget: (state, getters) => {
      const fatRatio = 0.4;
      const fatKcal = getters.tdee * fatRatio;
      const fatGrams = fatKcal / 9;
      return fatGrams ? fatGrams.toFixed(1) : 0;
    },

    totalFat: state => {
      function reducer(totalFat, currentEntry) {
        if (currentEntry.type === 'food') {
          return totalFat + (currentEntry.nutrition.fett.value * currentEntry.quantity * 0.01);
        } else {
          return totalFat
        }
      }
      return state.dailyEntries ? state.dailyEntries.reduce(reducer, 0).toFixed(1) : 0;
    }
  },

  mutations: {
    login(state, user) {
      state.user = user;
      state.loggedIn = true;
      this.dispatch('fetchEntries');
    },
    logout(state) {
      state.user = {};
      state.userData = defaultUserData;
      state.dailyEntries = [];
      state.loggedIn = false;
    },
    goToYesterday(state) {
      let date = new Date(state.selectedDate);
      date.setDate(date.getDate() - 1)
      state.selectedDate = formatDate(date);
      this.dispatch('fetchEntries');
    },
    goToTomorrow(state) {
      let date = new Date(state.selectedDate);
      date.setDate(date.getDate() + 1)
      state.selectedDate = formatDate(date);
      this.dispatch('fetchEntries');
    },
    addEntry(state, entry) {
      state.dailyEntries.push(entry);
    },
    setEntries(state, entries) {
      state.dailyEntries = entries;
    },
    setUnsubscribe(state, unsubscribe) {
      state.unsubscribe = unsubscribe;
    },
    setUserData(state, newUserData) {
      state.userData = { ...state.userData, ...newUserData };
    },
    clearUserData(state) {
      state.userData = {};
    }
  },

  actions: {
    async login(context, payload) {
      context.commit('clearUserData');
      const { email, password } = payload;
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      if (user) {
        context.commit('login', user.user);
        context.dispatch('getUserData', user.user);
        return true
      } else { return false }
    },
    async logout(context) {
      await firebase.auth().signOut();
      context.commit('logout');
    },
    goToYesterday(context) {
      context.commit('goToYesterday');
    },
    goToTomorrow(context) {
      context.commit('goToTomorrow');
    },
    addEntry(context, payload) {
      context.commit('addEntry', payload);
    },
    async fetchEntries(context) {
      context.state.unsubscribe();
      const unsubscribe = db.collection('users')
        .doc(context.state.user.uid)
        .collection('entries')
        .where('date', '==', context.state.selectedDate)
        .onSnapshot((snapshot) => {
          const entries = snapshot.docs.map(snapshot => {
            const entry = snapshot.data();
            entry.id = snapshot.id;
            return entry
          })
          context.commit('setEntries', entries);
        })
      context.commit('setUnsubscribe', unsubscribe);
    },
    async getUser(context) {
      const user = firebase.auth().currentUser
      if (user) {
        context.commit('login', user);
        this.dispatch('getUserData', user);
      }
    },
    async getUserData(context, user) {
      const snapshot = await db.collection('users').doc(user.uid).get();
      const userData = snapshot.data();
      context.commit('setUserData', userData);
    },
    async setUserData(context, newUserData) {
      if (context.state.loggedIn) {
        await db.collection('users').doc(context.state.user.uid).set(newUserData, { merge: true });
        context.commit('setUserData', newUserData);
      } else {
        context.commit('setUserData', newUserData);
      }
    }
  }
})

// the old fetch entries function:
// const response = await db.collection('entries')
//         .where('user', '==', this.state.user.uid)
//         .where('date', '==', this.state.selectedDate).get();
//       const entries = response.docs.map(snapshot => {
//         const entry = snapshot.data();
//         entry.id = snapshot.id;
//         return entry;
//       });
