<template>
  <big-progress-bars v-bind:bars="bars" heading="Mål" />  
</template>

<script>
import { mapGetters } from "vuex";
import BigProgressBars from '@/components/BigProgressBars.vue';

export default {
  components: {
    BigProgressBars: BigProgressBars
  },
  computed: {
    ...mapGetters([
      "tdee",
      "totalKcal",
      "proteinTarget",
      "totalProtein",
      "carbsTarget",
      "totalCarbs",
      "fatTarget",
      "totalFat"
    ]),
    bars: function() {
      return [
          {
          title: 'Energi',
          percent: this.getPercent(this.totalKcal, this.tdee),
          total: this.totalKcal,
          target: this.tdee,
          unit: ' kcal',
          color: '#f2f20e'
        },
        {
          title: 'Protein',
          percent: this.getPercent(this.totalProtein, this.proteinTarget),
          total: this.totalProtein,
          target: this.proteinTarget,
          unit: 'g',
          color: 'lightblue'
        },
        {
          title: 'Kolhydrater',
          percent: this.getPercent(this.totalCarbs, this.carbsTarget),
          total: this.totalCarbs,
          target: this.carbsTarget,
          unit: 'g',
          color: 'teal'
        },
        {
          title: 'Fett',
          percent: this.getPercent(this.totalFat, this.fatTarget),
          total: this.totalFat,
          target: this.fatTarget,
          unit: 'g',
          color: 'red'
        }
      ]
    }
  },

  methods: {
    getPercent(valueOne, valueTwo) {
      return Math.round((valueOne / valueTwo) * 100);
    }
  }
};
</script>
