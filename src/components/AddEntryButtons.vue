<template>
  <div class="add-entry-buttons">
    <div>
      <button class="open-add-food" @click="addFood = true">+livsmedel</button>
      <button class="open-add-activity" @click="addActivity = true">+aktivitet</button>
    </div>

    <add-food v-if="addFood" @close="addFood = false" />
    <add-activity v-if="addActivity" @close="addActivity = false" />
  
  </div>
</template>

<script>
import addFood from '@/components/AddFood.vue';
import addActivity from '@/components/AddActivity.vue';

export default {
  components: {
    'add-food': addFood,
    'add-activity': addActivity
  },
  data() {
    return {
      addFood: false,
      addActivity: false,
      addData: false,
    };
  },
  methods: {
    
  }
};
</script>

