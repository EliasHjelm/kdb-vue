const getters = {

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

  carbsTarget: (state, getters) => {
    const carbRatio = 0.4;
    const carbKcal = getters.tdee * carbRatio;
    const carbGrams = carbKcal / 4;
    return carbGrams ? carbGrams.toFixed(1) : 0;
  },

  fatTarget: (state, getters) => {
    const fatRatio = 0.4;
    const fatKcal = getters.tdee * fatRatio;
    const fatGrams = fatKcal / 9;
    return fatGrams ? fatGrams.toFixed(1) : 0;
  },

  totals: state => {
    const totals = {};
    for (let entry of state.dailyEntries) {
      if (entry.type === 'activity') {
        totals.kcal = +((totals.kcal || 0) - (entry.kcal * entry.quantity / 60)).toFixed(0)
      } else if (entry.type === 'food') {
        for (let nutrient in entry.nutrition) {
          totals[nutrient] = +((totals[nutrient] || 0) + (entry.nutrition[nutrient].value * entry.quantity * 0.01)).toFixed(2);
        }
      }
    }
    return totals
  }
}

export default getters;