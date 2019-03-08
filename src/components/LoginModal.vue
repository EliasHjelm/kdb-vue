<template>
  <app-modal @close="$emit('close')">
    <template slot="content">
      <div class="modal-header">
        <h3>Logga in</h3>
      </div>
      <div class="modal-body" >
        <template v-if="!loading">
          <p>Email:</p>
          <input type="email" name="login-email" v-model.lazy="email">
          <p>Lösenord:</p>
          <input type="password" name="login-password" v-model.lazy="password" @keypress.enter="login">
        </template>
        <app-spinner v-if="loading" />
      </div>
      <div class="modal-footer">
        <p class="login-failure error-message" v-if="failure">Inloggningen misslyckades</p>
        <button @click="login">Logga in</button>
      </div>

    </template>

  </app-modal>
  
</template>

<script>
import modal from '@/components/Modal.vue';
import spinner from '@/components/Spinner.vue';

export default {
  components: {
    "app-modal": modal,
    "app-spinner": spinner
  },
  data() {
    return {
      email: '',
      password: '',
      failure: false,
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true;
      const res = await this.$store.dispatch('login', { email: this.email, password: this.password });
      if (!res) {
        this.failure = true;
      } else {
        this.$emit('close')
      }

    }
  }
  
}
</script>

<style lang="scss">

</style>


