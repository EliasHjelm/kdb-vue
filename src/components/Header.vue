<template>
  <header>
    <h1>Kostdagboken.net</h1>
    <nav>
      <a href="#">Start</a>
      <a href="#" v-if="loggedIn">Statistik</a>
      <a href="#">Livsmedel</a>
      <a href="#">Hjälp?!</a>
      <a href="#">About</a>
      <a href="#" id="profile" v-if="loggedIn">{{ user.email }}</a>
    </nav>
    <div class="login" v-if="!loggedIn">
      <input type="email" name="login-email" placeholder="Email..." v-model="loginEmail">
      <input type="password" name="login-pwd" placeholder="Lösenord..." v-model="loginPassword" @keyup.enter="login">
    </div>
      <button id="login" @click="login" v-if="!loggedIn">Logga in</button>
      <button id="register" @click="registerUser = true" v-if="!loggedIn">Registrera</button>

      <button id="logout" @click="logout" v-if="loggedIn">Logga ut</button>
  <register-user-modal v-if="registerUser" @close="registerUser = false" />
  </header>
</template>

<script>
import registerUserModal from '@/components/RegisterUserModal.vue';

export default {
  components: {
    'register-user-modal': registerUserModal
  },
  data: function() {
    return {
      loginEmail: '',
      loginPassword: '',
      registerUser: false
    }
  },
  methods: {
    async login() {
      const res = await this.$store.dispatch('login', { email: this.loginEmail, password: this.loginPassword }); 
      if (!res) {
        this.displayLoginError();
      }
    },
    logout() {
      this.$store.dispatch('logout');
    },
    displayLoginError() {
      alert('WRONG PASSWORD/USERNAME MOTHAFUKKA'); //a discrete and well-tempered error message
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    loggedIn() {
      return this.$store.state.loggedIn
    }
  }
  
}
</script>

