<template>
  <section class="profile">
    <h3>{{ $store.state.user.email }}</h3>
    <tdee-settings :open="true" />
    <change-password />
  </section>
</template>

<script>
import tdeeSettings from '@/components/TDEESettings.vue'
import changePassword from '@/components/ChangePassword.vue'

export default {
  components: {
    'tdee-settings': tdeeSettings,
    'change-password': changePassword
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 0.5rem;

  h3 {
    margin-bottom: 1rem;
  }
}
</style>



