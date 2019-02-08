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
      "proteinTarget",
      "carbsTarget",
      "fatTarget",
      "totals"
    ]),
    bars: function() {
      return [
          {
          title: 'Energi',
          percent: this.getPercent(this.totals.kcal, this.tdee),
          total: this.totals.kcal,
          target: this.tdee,
          unit: ' kcal',
          color: '#f2f20e'
        },
        {
          title: 'Protein',
          percent: this.getPercent(this.totals.prot, this.proteinTarget),
          total: this.totals.prot,
          target: this.proteinTarget,
          unit: 'g',
          color: 'lightblue'
        },
        {
          title: 'Kolhydrater',
          percent: this.getPercent(this.totals.kolh, this.carbsTarget),
          total: this.totals.kolh,
          target: this.carbsTarget,
          unit: 'g',
          color: 'teal'
        },
        {
          title: 'Fett',
          percent: this.getPercent(this.totals.fett, this.fatTarget),
          total: this.totals.fett,
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
