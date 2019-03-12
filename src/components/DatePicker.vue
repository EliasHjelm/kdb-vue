<template>
  <div class="date-picker">
    <!-- eslint-disable-next-line -->
    <span class="yesterday" @click="goToYesterday"><strong><<</strong></span>
    <span class="today"><strong>{{ selectedDate }}</strong></span>
    <span class="tomorrow" @click="goToTomorrow"><strong>>></strong></span>
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

<style lang="scss">
.date-picker {
  display: flex;
  justify-content: space-around;
  border: 1.5px solid rgb(222, 226, 230);  
  padding: 0.5rem;
  border-bottom-width: 0;
  margin-bottom: 0;

  .yesterday, .tomorrow {
    cursor: pointer;
  }
}
</style>


