import { formatDate, defaultUserData } from '@/store/store.js';

const mutations = {

  login(state, user) {
    state.user = user;
    state.loggedIn = true;
    this.dispatch('fetchEntries');
  },

  logout(state) {
    state.user = {};
    state.userData = defaultUserData;
    state.loggedIn = false;
    this.dispatch('clearEntries')
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

  setLoadingEntries(state, loading) {
    state.loadingEntries = loading
  },

  addEntry(state, entry) {
    state.dailyEntries.push(entry);
  },

  setSelectedEntry(state, entry) {
    state.selectedEntry = entry;
  },

  setEntries(state, entries) {
    state.dailyEntries = entries;
  },

  setBiometrics(state, biometrics) {
    state.dailyBiometrics = biometrics
  },

  clearEntries(state) {
    state.dailyEntries = [],
    state.dailyBiometrics = []
  },

  setUnsubscribe(state, unsubscribe) {
    state.unsubscribe = unsubscribe;
  },

  setUserData(state, newUserData) {
    state.userData = { ...state.userData, ...newUserData };
  },
  
  clearUserData(state) {
    state.userData = {};
  },

  updateMedia(state, media) {
    state.media = media
  }
}

export default mutations;