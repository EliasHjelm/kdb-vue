<template>
  <div>
    <big-progress-bars v-bind:bars="bars" heading="Mål"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BigProgressBars from "@/components/BigProgressBars.vue";

export default {
  components: {
    BigProgressBars: BigProgressBars
  },
  computed: {
    ...mapGetters([
      "kcalTarget",
      "proteinTarget",
      "carbsTarget",
      "fatTarget",
      "totals"
    ]),
    bars: function() {
      return [
        {
          title: "Energi",
          percent: this.getPercent(this.totals.kcal.value, this.kcalTarget),
          total: this.totals.kcal.value || 0,
          target: this.kcalTarget,
          unit: " kcal",
          color: "#f2f20e",
          breakdown: this.totals.kcal?.breakdown || []
        },
        {
          title: "Protein",
          percent: this.getPercent(this.totals.prot.value, this.proteinTarget),
          total: this.totals.prot.value || 0,
          target: this.proteinTarget,
          unit: "g",
          color: "lightblue",
          breakdown: this.totals.prot?.breakdown || []
        },
        {
          title: "Kolhydrater",
          percent: this.getPercent(this.totals.kolh.value, this.carbsTarget),
          total: this.totals.kolh.value || 0,
          target: this.carbsTarget,
          unit: "g",
          color: "teal",
          breakdown: this.totals.kolh?.breakdown || []
        },
        {
          title: "Fett",
          percent: this.getPercent(this.totals.fett.value, this.fatTarget),
          total: this.totals.fett.value || 0,
          target: this.fatTarget,
          unit: "g",
          color: "red",
          breakdown: this.totals.fett?.breakdown || []
        }
      ];
    }
  },

  methods: {
    getPercent(valueOne, valueTwo) {
      const percent =
        valueOne && valueTwo ? Math.round((valueOne / valueTwo) * 100) : 0;
      return percent >= 0 ? percent : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
  div {
    grid-row: 1 / 2
  }

</style>

