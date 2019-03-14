import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import firebase from '@firebase/app';
import config from '../firebase.js';

firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const db = firebase.firestore();

// give all vue instances access to the database connection:
Vue.prototype.db = db;

db.settings({
  timestampsInSnapshots: true
});

Vue.config.productionTip = false;

let started = false;

firebase.auth().onAuthStateChanged(function() {
  if (!started) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    started = true;
  }
})

export default db;