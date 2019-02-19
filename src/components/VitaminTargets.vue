<template>
  <div>
    <small-progress-bars v-bind:bars="bars" heading="Vitaminer"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SmallProgressBars from "@/components/SmallProgressBars.vue";

export default {
  components: {
    SmallProgressBars: SmallProgressBars
  },
  computed: {
    ...mapGetters(["totals", "microTargets"]),
    bars: function() {
      const vitamins = [
        "tiam",
        "ribo",
        "niek",
        "vitB6",
        "vitB12",
        "fola",
        "vitA",
        "vitC",
        "vitD",
        "vitE",
        "vitK"
      ];
      const bars = [];
      for (let nutrient in this.$store.state.nutrientNames) {
        if (vitamins.includes(nutrient)) {
          const bar = {};
          bar.title = this.$store.state.nutrientNames[nutrient];
          bar.total = this.totals[nutrient].value || 0;
          bar.target = this.microTargets[nutrient];
          bar.percent = this.getPercent(bar.total, bar.target);
          bar.unit = this.$store.state.nutrientUnits[nutrient] || "g";
          bar.breakdown = this.totals[nutrient].breakdown || {};
          bars.push(bar);
        }
      }
      return bars;
    }
  },

  methods: {
    getPercent(valueOne, valueTwo) {
      return valueOne && valueTwo ? Math.round((valueOne / valueTwo) * 100) : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  grid-column-start: 1;
  grid-row: 2 / 4;
}
</style>

