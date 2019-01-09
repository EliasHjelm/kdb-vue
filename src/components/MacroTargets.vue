<template>
  <div class="macro-targets">
    <h3>Mål:</h3>
    <div class="macro-target-bars">
      <span>Energi</span>
      <div class="progress-bar energy">
        <div class="meter" :style="`width: ${getPercent(totalKcal, tdee)}%;`"></div>
        <span>{{totalKcal}} / {{tdee}} kcal ({{getPercent(totalKcal, tdee)}}%)</span>
      </div>
      <span>Protein</span>
      <div class="progress-bar protein">
        <div class="meter" :style="`width: ${getPercent(totalProtein, proteinTarget)}%;`"></div>
        <span>{{totalProtein}} / {{proteinTarget}} g ({{getPercent(totalProtein, proteinTarget)}}%)</span>
      </div>
      <span>Kolhydrater</span>
      <div class="progress-bar carbs">
        <div class="meter" :style="`width: ${getPercent(totalCarbs, carbsTarget)}%;`"></div>
        <span>{{totalCarbs}} / {{carbsTarget}} g ({{getPercent(totalCarbs, carbsTarget)}}%)</span>
      </div>
      <span>Fett</span>
      <div class="progress-bar fat">
        <div class="meter" :style="`width: ${getPercent(totalFat, fatTarget)}%;`"></div>
        <span>{{totalFat}} / {{fatTarget}} g ({{getPercent(totalFat, fatTarget)}}%)</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
    ])
  },

  methods: {
    getPercent(valueOne, valueTwo) {
      return Math.round((valueOne / valueTwo) * 100);
    }
  }
};
</script>
