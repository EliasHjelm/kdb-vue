<template>
  <section class="profile">
    <tdee-settings />
  </section>
</template>

<script>
import tdeeSettings from '@/components/TDEESettings.vue'

export default {
  components: {
    'tdee-settings': tdeeSettings
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 0.5rem;
}
</style>



