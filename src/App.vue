<template>
  <div id="app" @click="handleUniversalClick">
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
    this.listenForResize()   
  },
  methods: {
    handleUniversalClick() {
      if (this.$store.selectedEntry) {
        this.$store.dispatch('setSelectedEntry', false);
      }
    },
    listenForResize() {
      window.addEventListener('resize', () => this.$store.dispatch('updateSize'))
    }
  }


}
</script>



<style lang="scss">
@import '/assets/scss/style.scss';
</style>
