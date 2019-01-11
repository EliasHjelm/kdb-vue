function getNutrientTotal(state, nutrient, decimals) {
  function reducer(total, currentEntry) {
    if (currentEntry.type === 'food') {
      return total + (currentEntry.nutrition[nutrient].value * currentEntry.quantity * 0.01);
    }
  }
  return state.dailyEntries ? state.dailyEntries.reduce(reducer, 0).toFixed(decimals) : 0
}

const getters = {

  totalKcal: state => {
    function reducer(totalKcal, currentEntry) {
      if (currentEntry.type === 'food') {
        return totalKcal + (currentEntry.nutrition.kcal.value * currentEntry.quantity * 0.01);
      } else if (currentEntry.type === 'activity') {
        return totalKcal - (currentEntry.kcal * currentEntry.quantity / 60);
      }
    }
    return state.dailyEntries.reduce(reducer, 0);
  },

  bmr: state => {
    if (state.userData.gender === 'male') {
      return Math.round((state.userData.weight * 10) + (6.25 * state.userData.height) - (5 * state.userData.age) + 5)
    } else {
      return Math.round((state.userData.weight * 10) + (6.25 * state.userData.height) - (5 * state.userData.age) - 161)
    }

  },

  tdee: (state, getters) => {
    const activityLevelConstants = {
      sedentary: 1.2,
      moderate: 1.375,
      high: 1.7
    }
    return Math.round(activityLevelConstants[state.userData.activityLevel] * getters.bmr)
  },
  
  proteinTarget: (state, getters) => {
    const proteinRatio = 0.2;
    const proteinKcal = getters.tdee * proteinRatio;
    const proteinGrams = proteinKcal / 4;
    return proteinGrams ? proteinGrams.toFixed(1) : 0;
  },

  totalProtein: state => {
    return getNutrientTotal(state, 'prot', 1);
  },

  carbsTarget: (state, getters) => {
    const carbRatio = 0.4;
    const carbKcal = getters.tdee * carbRatio;
    const carbGrams = carbKcal / 4;
    return carbGrams ? carbGrams.toFixed(1) : 0;
  },

  totalCarbs: state => {
    return getNutrientTotal(state, 'kolh', 1);
  },

  fatTarget: (state, getters) => {
    const fatRatio = 0.4;
    const fatKcal = getters.tdee * fatRatio;
    const fatGrams = fatKcal / 9;
    return fatGrams ? fatGrams.toFixed(1) : 0;
  },

  totalFat: state => {
    return getNutrientTotal(state, 'fett', 1);
  }
}

export default getters;