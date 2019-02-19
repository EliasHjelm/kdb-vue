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
  },
  methods: {
    handleUniversalClick() {
      const selected = document.getElementsByClassName('selected-entry')[0];
      selected && selected.classList.remove('selected-entry');
      this.$store.dispatch('setSelectedEntry', false);
    }
  }


}
</script>



<style lang="scss">
@import '/assets/scss/style.scss';
</style>
