import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import db from '@/main.js';


const actions = {

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
    // the return value from onSnapShot() is a function that "unsubscribes" from updates
    const unsubscribeFunction = db.collection('users')
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
    context.commit('setUnsubscribe', unsubscribeFunction);
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

export default actions;