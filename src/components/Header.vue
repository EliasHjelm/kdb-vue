<template>
  <header>
    <h1>Kostdagboken.net</h1>
      <img class="hamburger-menu-icon" src="@/assets/images/menu-icon.svg" @click="expandMenu">
    <nav @click="collapseMenu">
      <a href="#" class="navigation-link">Start</a>
      <a href="#" class="navigation-link" v-if="loggedIn">Statistik</a>
      <a href="#" class="navigation-link">Livsmedel</a>
      <a href="#" class="navigation-link">Hjälp?!</a>
      <a href="#" class="navigation-link">About</a>
      <a href="#" class="navigation-link" v-if="loggedIn">{{ user.email }}</a>
      <a href="javascript:void(0);" class="login-link navigation-link" v-if="!loggedIn" @click="showLoginModal = true">Logga in</a>
      <a href="#" class="navigation-link" @click="registerUser = true" v-if="!loggedIn">Registrera</a>
      <a href="#" class="navigation-link" @click="logout" v-if="loggedIn">Logga ut</a>
    </nav>
  <register-user-modal v-if="registerUser" @close="registerUser = false && collapseMenu()" />
  <login-modal v-if="showLoginModal" @close="showLoginModal = false && collapseMenu()" />
  </header>
</template>

<script>
import registerUserModal from '@/components/RegisterUserModal.vue';
import loginModal from '@/components/LoginModal.vue';

export default {
  components: {
    'register-user-modal': registerUserModal,
    'login-modal': loginModal
  },
  data: function() {
    return {
      registerUser: false,
      showLoginModal: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    expandMenu() {
      for (let link of document.getElementsByClassName('navigation-link')) {
        link.classList.toggle('expand');
      }
    },
    collapseMenu() {
      for (let link of document.getElementsByClassName('expand')) {
        link.classList.remove('expand');
      }
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

