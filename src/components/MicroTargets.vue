<template>
  <div>
    <small-progress-bars v-bind:bars="bars" heading="Allt" />  
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SmallProgressBars from '@/components/SmallProgressBars.vue';

export default {
  components: {
    SmallProgressBars: SmallProgressBars
  },
  computed: {
    ...mapGetters([
      "totals",
      "microTargets"
    ]),
    bars: function() {
      const bars = [];
      for (let nutrient in this.$store.state.nutrientNames) {
        const bar = {};
        bar.title = this.$store.state.nutrientNames[nutrient];
        bar.total = this.totals[nutrient] || 0;
        bar.target = this.microTargets[nutrient];
        bar.percent = this.getPercent(bar.total, bar.target);
        bar.unit = this.$store.state.nutrientUnits[nutrient] || 'g';
        bar.color = 'blue';
        bars.push(bar)
      }
      return bars
    }
  },

  methods: {
    getPercent(valueOne, valueTwo) {
      return valueOne && valueTwo ? Math.round((valueOne / valueTwo) * 100) : 0
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  grid-row: 3 / 5;
  grid-column-start: 2;
}
</style>

