<template>
<section class="expanding-card">
  <div class="header">
    <h3 @click="toggleBody">{{ title }}</h3>
    <span @click="toggleBody">{{ toggleIcon }}</span>
  </div>
  <transition-expand>
    <div class="body" v-if="displayBody">
      <slot name="content" />
    </div>
  </transition-expand>
</section>
  
</template>

<script>
import transitionExpand from '@/components/TransitionExpand.vue'
export default {
  props: {
    title: {
      type: String,
      default: 'Card Title'
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'transition-expand': transitionExpand
  },
  data: function() {
    return {
      toggleIcon: this.open ? '↑' : '↓',
      displayBody: this.open
      }
  },
  methods: {
    toggleBody() {
      this.displayBody = !this.displayBody;
      this.toggleIcon = this.toggleIcon === '↓' ? '↑' : '↓';
    }
  },
  
}
</script>

<style lang="scss">
section.expanding-card {
  border: 0.07rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
  padding: 1rem;
  margin-bottom: 1rem;

  .header {
    display: grid;
    grid-template-columns: minmax(20px, 1fr) max-content minmax(50px, 1fr);

    h3 {
      grid-column-start: 2;
      text-align: center;
      font-weight: 600;
      cursor: pointer;
    }

    span {
      text-align: center;
      font-size: 150%;
      cursor: pointer;
    }
  }
  .body {
    p, label {
      display: block;
      margin: 1rem 0 0.6rem;
      font-size: 120%;
      font-weight: 400;
    }

    label.radio-label {
      display: inline-block;
      margin: 0;
      font-size: 90%;
    }
  
    select {
      border: 0.07rem solid rgba(0, 0, 0, 0.3);
      border-radius: 0.2rem;
      padding: 0.2rem 0.1rem;
    }
  
    input {
      border: 0.07rem solid rgba(0, 0, 0, 0.3);
      border-radius: 0.2rem;
      padding: 0.2rem 0.1rem;
      margin-right: 0.3rem;

      &[type=number] {
        width: 3rem;
      }
    }
  }
}

</style>



