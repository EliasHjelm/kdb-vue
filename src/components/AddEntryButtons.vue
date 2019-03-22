<template>
  <div class="add-entry-buttons">
    <div>
      <button class="open-add-food" @click="addFood = true">+livsmedel</button>
      <button class="open-add-activity" @click="addActivity = true">+aktivitet</button>
      <button class="open-add-biometric" @click="addBiometric = true">+vikt</button>
    </div>

    <add-food v-if="addFood" @close="addFood = false" />
    <add-activity v-if="addActivity" @close="addActivity = false" />
    <add-biometric v-if="addBiometric" @close="addBiometric = false" />
  
  </div>
</template>

<script>
import addFood from '@/components/AddFood.vue';
import addActivity from '@/components/AddActivity.vue';
import addBiometric from '@/components/AddBiometric.vue'

export default {
  components: {
    'add-food': addFood,
    'add-activity': addActivity,
    'add-biometric': addBiometric
  },
  data() {
    return {
      addFood: false,
      addActivity: false,
      addBiometric: false,
    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
.add-entry-buttons {

  button {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 0.3rem;
    border: 0.07rem solid rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 90%;
    transition: all 0.2s;
    &:hover {
      background-color: #ddd;
    }
    background-color: #fff;
  }

  margin-bottom: 0.5rem;
}
</style>
