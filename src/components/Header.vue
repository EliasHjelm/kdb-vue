<template>
  <header>
    <router-link to="/">
      <h1>Kostdagboken.net</h1>
    </router-link>
      <img v-if="!desktop" class="hamburger-menu-icon" src="@/assets/images/menu-icon.svg" @click="menuCollapsed = !menuCollapsed">
      <transition-expand>
        <nav @click="collapseMenu" v-if="desktop || !menuCollapsed">
          <router-link to="/">Start</router-link>
          <router-link to="/profil" v-if="loggedIn">Profil</router-link>
          <a href="#" v-if="!loggedIn" @click="showLoginModal = true">Logga in</a>
          <a href="#" @click="registerUser = true" v-if="!loggedIn">Registrera</a>
          <a href="#" @click="logout" v-if="loggedIn">Logga ut</a>
        </nav>
      </transition-expand>
  <register-user-modal v-if="registerUser" @close="registerUser = false && collapseMenu()" />
  <login-modal v-if="showLoginModal" @close="showLoginModal = false && collapseMenu()" :toggleRecoveryModal="togglePasswordRecoveryModal" />
  <password-recovery-modal v-if="showPasswordRecoveryModal" @close="showPasswordRecoveryModal = false && collapseMenu()" />
  </header>
</template>

<script>
import registerUserModal from '@/components/RegisterUserModal.vue';
import loginModal from '@/components/LoginModal.vue';
import passwordRecoveryModal from '@/components/PasswordRecoveryModal.vue';
import transitionExpand from '@/components/TransitionExpand.vue';

export default {
  components: {
    'register-user-modal': registerUserModal,
    'login-modal': loginModal,
    'password-recovery-modal': passwordRecoveryModal,
    'transition-expand': transitionExpand
  },
  data: function() {
    return {
      registerUser: false,
      showLoginModal: false,
      showPasswordRecoveryModal: false,
      menuCollapsed: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    expandMenu() {
      this.menuCollapsed = false
    },
    collapseMenu() {
      this.menuCollapsed = true
    },
    togglePasswordRecoveryModal() {
      this.showPasswordRecoveryModal = true
      this.showLoginModal = false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    loggedIn() {
      return this.$store.state.loggedIn
    },
    desktop() {
      return this.$store.state.media.desktop
    }
  }
  
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  min-height: 70px;
  background-color: #333;
  padding: 20px 10px 3px 10px;
  transition: height 0.3s;

  h1 {
    color: #eee;
    font-size: 170%;
    display: inline-block;
  }

  .hamburger-menu-icon {
    position: absolute;
    top: 20px;
    right: 50px;
    height: 30px;
    width: 30px;
    @media screen and (max-width: $breakpoint-tablet) {
    }
  }

  nav {    
    position: relative;
    display: inline-block;
    margin: 0 25px;

    @media screen and (max-width: $breakpoint-tablet) {
        & {
          display: block;
        }
      }

    a {
      color: #eee;
      text-decoration: none;
      cursor: pointer;
      font-size: 110%;
      margin: 0 8px;

      @media screen and (max-width: $breakpoint-tablet) {
        & {
          display: block;
          margin: 1rem 0;
        }
      }
    }

    
  }
}
</style>
