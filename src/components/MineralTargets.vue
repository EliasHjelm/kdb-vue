<template>
  <div>
    <small-progress-bars v-bind:bars="bars" heading="Mineraler"/>
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
      const minerals = [
        "kalc",
        "kopp",
        "järn",
        "magn",
        "fosf",
        "kali",
        "sele",
        "zink",
        "natr",
        "jod"
      ];
      const bars = [];
      for (let nutrient in this.$store.state.nutrientNames) {
        if (minerals.includes(nutrient)) {
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
@media screen and (min-width: $breakpoint-tablet) {
  div {
    grid-row: 1 / 3
  }
}

</style>

