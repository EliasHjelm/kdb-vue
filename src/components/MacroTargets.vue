<template>
  <div>
    <big-progress-bars v-bind:bars="bars" heading="Mål" />  
  </div>
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
          percent: this.getPercent(this.totals.kcal.value, this.tdee),
          total: this.totals.kcal.value || 0,
          target: this.tdee,
          unit: ' kcal',
          color: '#f2f20e'
        },
        {
          title: 'Protein',
          percent: this.getPercent(this.totals.prot.value, this.proteinTarget),
          total: this.totals.prot.value || 0,
          target: this.proteinTarget,
          unit: 'g',
          color: 'lightblue'
        },
        {
          title: 'Kolhydrater',
          percent: this.getPercent(this.totals.kolh.value, this.carbsTarget),
          total: this.totals.kolh.value || 0,
          target: this.carbsTarget,
          unit: 'g',
          color: 'teal'
        },
        {
          title: 'Fett',
          percent: this.getPercent(this.totals.fett.value, this.fatTarget),
          total: this.totals.fett.value || 0,
          target: this.fatTarget,
          unit: 'g',
          color: 'red'
        }
      ]
    }
  },

  methods: {
    getPercent(valueOne, valueTwo) {
      const percent = valueOne && valueTwo ? Math.round((valueOne / valueTwo) * 100) : 0;
      return percent >= 0 ? percent : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  grid-column-start: 1;
}
</style>

