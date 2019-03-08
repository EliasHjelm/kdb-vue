<template>
  <app-modal @close="$emit('close')">
    <template slot="content">
      <div class="modal-header">
        <h3>Registrera ny användare</h3>
      </div>
      <div class="modal-body">
        <template v-if="!loading">
          <p>Email:</p>
          <input type="email" name="register-email" v-model.lazy="email">
          <p>Lösenord:</p>
          <input type="password" name="register-password" v-model.lazy="password">
          <p>Bekräfta lösenord:</p>
          <input type="password" name="register-password-conf" v-model.lazy="passwordConf">
        </template>
        <app-spinner v-if="loading" />
      </div>
      <div class="modal-footer">
        <p class="registration-failure error-message" v-if="registrationFailure">Registreringen misslyckades</p>
        <p class="password-failure error-message" v-if="passwordFailure">Lösenorden matchade inte!</p>
        <button @click="registerUser">Registrera</button>
      </div>

    </template>
  </app-modal>  
</template>

<script>
import modal from "@/components/Modal.vue";
import spinner from '@/components/Spinner.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  components: {
    "app-modal": modal,
    "app-spinner": spinner
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConf: "",
      registrationFailure: false,
      passwordFailure: false,
      emailFailure: false,
      loading: false
    };
  },
  methods: {
    async registerUser() {
      if (this.validateUser()) {
        this.loading = true;
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        console.log('user from firebase:', user);
        if (user) {
          console.log('successfully registered')
          await this.$store.dispatch('login', { email: this.email, password: this.password });
          this.$emit('close')
        } else {
          this.registrationFailure = true;
        }
        this.loading = false;
      }
    },
    validateUser() {
      this.passwordFailure = false;
      this.emailFailure = false;
      this.registrationFailure = false;
      if (this.email && this.password === this.passwordConf) {
        return true;
      } else if (this.password !== this.passwordConf) {
        this.passwordFailure = true;
        return false;
      } else {
        this.emailFailure = true;
        return false;
      }
    }
  }
};
</script>

