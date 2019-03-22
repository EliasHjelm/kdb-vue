<template>
  <expanding-card title="Byt lösenord">
    <template slot="content">
      <div class="change-password-form" v-if="!loading && !success">
        <label for="current-password">Nuvarande lösenord:</label>
        <input type="password" name="current-password" id="current-password" v-model="oldPassword" ref="oldPassword">
        <label for="new-password">Nytt lösenord:</label>
        <input type="password" name="new-password" id="new-password" v-model="newPassword" ref="newPassword">
        <label for="confirm-password">Bekräfta lösenord:</label>
        <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword" @keydown.enter="changePassword">
        <button @click="changePassword">Byt Lösenord</button>
      </div>
      <spinner v-if="loading" />
      <div v-if="success">
        <p>Ditt lösenord har ändrats!</p>
        <button @click="resetForm">Ändra det igen!</button>
      </div>
      <app-alert v-if="failure">
        <template slot="content">
          {{ errorMessage }}
        </template>
      </app-alert>
    </template>
  </expanding-card>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import expandingCard from '@/components/ExpandingCard.vue'
import spinner from '@/components/Spinner.vue'
import alert from '@/components/Alert.vue'

export default {
  components: {
    'expanding-card': expandingCard,
    'spinner': spinner,
    'app-alert': alert
  },
  data: function() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      loading: false,
      success: false,
      failure: false,
      errorMessage: 'Något gick fel, försök igen!'
    }
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmPassword || this.newPassword.length < 6) {
        this.failure = true
        this.errorMessage = this.newPassword !== this.confirmPassword ? 'Lösenorden stämmer inte överens' : 'Ditt lösenord måste vara minst tecken'
        this.newPassword = ''
        this.confirmPassword = ''
        return this.$refs.newPassword.focus()
      }
      this.loading = true
      this.failure = false
      this.errorMessage = 'Något gick fel, försök igen!'
      try {
        const credential = firebase.auth.EmailAuthProvider.credential(this.$store.state.user.email, this.oldPassword)
        await firebase.auth().currentUser.reauthenticateWithCredential(credential)
        await firebase.auth().currentUser.updatePassword(this.newPassword)
        this.loading = false
        this.success = true
      } catch (e) {
        this.loading = false
        this.failure = true
        if (e.code === 'auth/wrong-password') {
          this.errorMessage = 'Fel lösenord'
          this.newPassword = ''
          this.confirmPassword = ''
          await this.$nextTick
          this.$refs.oldPassword.select()
        } else if (e.code === 'auth/weak-password') {
          this.errorMessage = 'Ditt lösenord är för svagt'
          await this.$nextTick
          this.$refs.newPassword.select()
        }
        console.log(e)
      }
    },
    resetForm() {
      this.failure = false
      this.success = false
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    }
  }  
}
</script>

<style lang="scss">
.change-password-form {
  input {
    width: 100% !important;
  }

  button {
    padding: 0.3rem;
    border-radius: 0.3rem;
    margin: 1rem 0;
    cursor: pointer;
    border: 0.07rem solid rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s;
    &:hover {
      background-color: #ccc
    }
  }
}
</style>
