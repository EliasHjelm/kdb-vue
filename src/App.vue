<template>
  <div id="app">
    <app-header />
    
    <main>
      <router-view />
    </main>    

    <app-footer />
  </div>
</template>

<script>
import header from '@/components/Header.vue';
import footer from '@/components/Footer.vue';

export default {
  components: {
    'app-header': header,
    'app-footer': footer
  },
  created() {
    this.$store.dispatch('getUser');    
  }


}
</script>



<style lang="scss">
@import '/assets/scss/style.scss';
</style>
