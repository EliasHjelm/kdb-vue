<template>
  <div class="date-picker">
    <!-- eslint-disable-next-line -->
    <span class="yesterday" @click="goToYesterday"><<</span>
    <span class="today">{{ selectedDate }}</span>
    <span class="tomorrow" @click="goToTomorrow">>></span>
  </div>
</template>

<script>
export default {
  computed: {
    selectedDate() {
      return this.$store.state.selectedDate
    }
  },
  methods: {
    goToYesterday() {
      this.$store.dispatch('goToYesterday');
    },
    goToTomorrow() {
      this.$store.dispatch('goToTomorrow');
    }
  }
}
</script>

