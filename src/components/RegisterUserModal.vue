<template>
  <app-modal @close="$emit('close')">
    <template slot="content">
      <div class="modal-header">
        <h3>Registrera ny användare</h3>
      </div>
      <div class="modal-body">
        <template v-if="!loading">
          <p>Email:</p>
          <input type="email" name="register-email" v-model="email" :class="isEmailPristine ? '' : isEmailValid ? 'valid' : 'invalid'" @change.once="isEmailPristine = false" ref="email">
          <p class="red-text" v-if="!isEmailPristine && !isEmailValid">
            Du måste ange en giltig epostadress
          </p>
          <p>Lösenord:</p>
          <input type="password" name="register-password" v-model="password" :class="isPasswordPristine ? '' : isPasswordValid ? 'valid' : 'invalid'" @change.once="isPasswordPristine = false">
          <p class="red-text" v-if="!isPasswordPristine && !isPasswordValid">Ditt lösenord måste vara minst sex tecken</p>
          <p>Bekräfta lösenord:</p>
          <input type="password" name="register-password-conf" v-model="passwordConf" :class="isPasswordConfPristine ? '' : doPasswordsMatch ? 'valid' : 'invalid'" @input.once="isPasswordConfPristine = false">
          <p class="red-text" v-if="!isPasswordConfPristine && !doPasswordsMatch">Lösenorden stämmer inte överens</p>
        </template>
        <app-spinner v-if="loading" />
      </div>
      <div class="modal-footer">
        <app-alert v-if="failure">
          <template slot="content">
            <p>{{errorMessage}}</p>
          </template>
        </app-alert>
        <button @click="registerUser" :disabled="!isFormValid">Registrera</button>
      </div>

    </template>
  </app-modal>  
</template>

<script>
import modal from "@/components/Modal.vue";
import spinner from '@/components/Spinner.vue';
import alert from '@/components/Alert.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  components: {
    "app-modal": modal,
    "app-spinner": spinner,
    "app-alert": alert
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConf: "",
      failure: false,
      errorMessage: 'Något gick fel med registreringen',
      loading: false,
      isEmailPristine: true,
      isPasswordPristine: true,
      isPasswordConfPristine: true
    };
  },
  mounted() {
    this.$refs.email.select()
  },
  methods: {
    async registerUser() {
      this.loading = true;
      const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
      if (user) {
        console.log('successfully registered')
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        await firebase.auth().currentUser.sendEmailVerification()
        this.$emit('close')
        this.$router.push('/profil')
      } else {
        this.failure = true;
      }
      this.loading = false;
    }
  },
  computed: {
    isEmailValid() {
      return /^[^@\s]+@[^@\s]{2,}\.[^@\s]{2,}$/.test(this.email) ? true : false      
    },
    isPasswordValid() {
      return this.password.length >= 6
    },
    doPasswordsMatch() {
      return this.password === this.passwordConf
    },
    isFormValid() {
      return this.isEmailValid && this.isPasswordValid && this.doPasswordsMatch
    }
  }
};
</script>

<style lang="scss" scoped>

</style>


