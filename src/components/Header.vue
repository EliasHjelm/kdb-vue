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
      <button id="register" @click="register" v-if="!loggedIn">Registrera</button>

      <button id="logout" @click="logout" v-if="loggedIn">Logga ut</button>
  </header>
</template>

<script>
export default {
  data: function() {
    return {
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    login() {
      console.log('Logging in !', this.loginEmail, this.loginPassword); 
      this.$store.dispatch('login', {email: this.loginEmail});   
    },
    register() {
      console.log('Registering');
    },
    logout() {
      this.$store.dispatch('logout');
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

