<template>
  <app-modal @close="$emit('close')">
    <template slot="content">
      <div class="modal-header">
        <h3>Logga in</h3>
      </div>
      <div class="modal-body" >
        <template v-if="!loading">
          <p>Email:</p>
          <input type="email" name="login-email" v-model.lazy="email" ref="email">
          <p>Lösenord:</p>
          <input type="password" name="login-password" v-model.lazy="password" @keydown.enter="login" ref="password">
        </template>
        <app-spinner v-if="loading" />
      </div>
      <div class="modal-footer">
        <app-alert v-if="failure">
          <template slot="content">
            <p>{{errorMessage}}</p>
          </template>
        </app-alert>
        <button @click="login">Logga in</button>
      </div>

    </template>

  </app-modal>
  
</template>

<script>
import modal from '@/components/Modal.vue';
import spinner from '@/components/Spinner.vue';
import alert from '@/components/Alert.vue';
import Vue from 'vue';

export default {
  components: {
    "app-modal": modal,
    "app-spinner": spinner,
    "app-alert": alert
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      failure: false,
      errorMessage: 'Något gick fel'
    }
  },
  methods: {
    async login() {
      this.loading = true;
      // function is young and optimistic
      this.failure = false;
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$emit('close')
      } catch (e) {
        console.log('catch', e)
        this.failure = true;
        this.loading = false;
        await Vue.nextTick()
        switch (e.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'Vi kunde inte hitta någon användare med den epost-adressen'
            this.$refs.email.focus()
            break
          case 'auth/invalid-email':
            this.errorMessage = 'Ogiltig epostadress'
            break
          case 'auth/wrong-password':
            this.errorMessage = 'Felaktigt användarnamn eller lösenord'
            break
        }
      }

    }
  }
  
}
</script>

<style lang="scss" scoped>

</style>



