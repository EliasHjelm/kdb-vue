<template>
  <app-modal @close="$emit('close')">
    <template slot="content">
      <div class="modal-header">
        <h3>Återställ lösenord</h3>
      </div>
      <div class="modal-body">
        <template v-if="!loading && !sent">
          <p>Email:</p>
          <input type="email" name="email" v-model="email" ref="email" @keydown.enter="sendRecoveryEmail" :class="isEmailValid || !email.length ? 'valid' : 'invalid' ">
        </template>
        <app-spinner v-if="loading" />
        <p v-if="!loading && sent">Ett mail med instruktioner om hur du gör för att återställa ditt lösenord har skickats till {{email}}.</p>
      </div>
      <div class="modal-footer">
        <button @click="sendRecoveryEmail" :disabled="!isEmailValid">Återställ lösenord</button>
      </div>

    </template>
  </app-modal>  
</template>


<script>
import modal from '@/components/Modal.vue'
import spinner from '@/components/Spinner.vue'
import firebase from '@firebase/app'
import '@firebase/auth'

export default {
  components: {
    'app-modal': modal,
    'app-spinner': spinner
  },
  data: function() {
    return {
      loading: false,
      sent: false,
      email: ''
    }
  },
  methods: {
    async sendRecoveryEmail() {
      this.loading = true
      try {
        await firebase.auth().sendPasswordResetEmail(this.email)
        this.loading = false
        this.sent = true
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    isEmailValid() {
      return /^[^@\s]+@[^@\s]{2,}\.[^@\s]{2,}$/.test(this.email) ? true : false      
    },
  }
  
}
</script>
