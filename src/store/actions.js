import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import db from '@/main.js';

// leaving this here for now
let localEntryCount = 0;

const actions = {

  async login(context, payload) {
    // i didnt manage to make this work with a try/catch block, somehow it didn't catch the awaited error
    const { email, password } = payload;
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    context.commit('login', response.user);
    context.dispatch('getUserData', response.user);    
  },

  async logout(context) {
    context.state.unsubscribe();
    await firebase.auth().signOut();
    context.commit('logout');
  },
  goToYesterday(context) {
    context.commit('goToYesterday');
  },
  goToTomorrow(context) {
    context.commit('goToTomorrow');
  },
  addEntry(context, entry) {
    entry.id = ++localEntryCount;
    context.commit('addEntry', entry);
  },
  setSelectedEntry(context, payload) {
    context.commit('setSelectedEntry', payload);
  },
  setLoadingEntries(context, payload) {
    context.commit('setLoadingEntries', payload);
  },
  async fetchEntries(context) {
    context.commit('clearEntries');
    if (context.state.loggedIn) {
      context.dispatch('setLoadingEntries', true);
      context.state.unsubscribe();
      // the return value from onSnapShot() is a function that "unsubscribes" from updates
      const unsubscribeFunction = db.collection('entries')
        .doc(context.state.user.uid)
        .collection(context.state.selectedDate)
        .onSnapshot((snapshot) => {
          const entries = snapshot.docs.map(snapshot => {
            const entry = snapshot.data();
            entry.id = snapshot.id;
            return entry
          })
          context.commit('setEntries', entries);
          context.dispatch('setLoadingEntries', false);
        })
      const unsubscribeBiometrics = db.collection('entries').doc(context.state.user.uid).collection('weight')
        .where('date', '==', context.state.selectedDate).onSnapshot((snapshot) => {
          const entries = snapshot.docs.map(snapshot => {
            const entry = snapshot.data()
            entry.id = snapshot.id
            return entry
          })
          context.commit('setBiometrics', entries)
        })
        const unsubscribe = () => {
          unsubscribeFunction()
          unsubscribeBiometrics()
        }
      context.commit('setUnsubscribe', unsubscribe);
    }

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
  },

  setEntries(context, entries) {
    context.commit('setEntries', entries)
  },

  clearEntries(context) {
    context.commit('clearEntries')
  },

  updateSize(context) {
    const desktop = window.matchMedia('(min-width: 1024px').matches
    context.commit('updateMedia', {
      desktop: desktop
    })
  }
}

export default actions;