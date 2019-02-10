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
    // loop through the entries, and the nutrients of each entry to get a neat totals object
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
  },

  microTargets: state => {
    const targets = {};
    targets.vitA = state.userData.gender === 'male' ? 900 : 700;
    targets.vitD = state.userData.age > 75 ? 10 : 20;
    targets.vitE = state.userData.gender === 'male' ? 10 : 8;
    targets.vitB12 = 2;
    targets.vitC = state.userData.age > 13 ? 75 : 50;
    targets.kalc = state.userData.age > 17 ? 800 : 900;
    targets.fosf = state.userData.age > 17 ? 600: 700;
    targets.kopp = state.userData.age > 13 ? 0.9 : 0.7;
    targets.jod = 150;
    targets.vitK = state.userData.gender === 'male' ? 120 : 90;
    targets.natr = 2400;

    if (state.userData.gender === 'male') {
      targets.kali = state.userData.age > 13 ? 3500 : 3300;
      targets.magn = state.userData.age > 13 ? 350 : 280;
      targets.järn = state.userData.age > 17 ? 9 : 11;
      targets.sele = state.userData.age > 13 ? 60 : 40;
      if (state.userData.age < 14) {
        targets.tiam = 1.1
        targets.ribo = 1.3
        targets.niek = 15
        targets.vitB6 = 1.2
        targets.fola = 200
        targets.zink = 11
      } else if (state.userData.age < 18) {
        targets.tiam = 1.4
        targets.ribo = 1.7
        targets.niek = 19
        targets.vitB6 = 1.6
        targets.fola = 300
        targets.zink = 12
      } else if (state.userData.age < 31) {
        targets.tiam = 1.4
        targets.ribo = 1.6
        targets.niek = 19
        targets.vitB6 = 1.5
        targets.fola = 300
        targets.zink = 9
      } else if (state.userData.age < 61) {
        targets.tiam = 1.3
        targets.ribo = 1.5
        targets.niek = 18
        targets.vitB6 = 1.5
        targets.fola = 300
        targets.zink = 9
      } else if (state.userData.age < 75) {
        targets.tiam = 1.2
        targets.ribo = 1.4
        targets.niek = 16
        targets.vitB6 = 1.5
        targets.fola = 300
        targets.zink = 9
      } else {
        targets.tiam = 1.2
        targets.ribo = 1.3
        targets.niek = 15
        targets.vitB6 = 1.5
        targets.fola = 300
        targets.zink = 9
      }
    } else { // if gender === 'female'
      targets.kali = state.userData.age > 13 ? 3100 : 2900;
      targets.magn = 280;
      targets.sele = state.userData.age > 13 ? 50 : 40;
      if (state.userData.age < 14) {
        targets.tiam = 1.0
        targets.ribo = 1.2
        targets.niek = 14
        targets.vitB6 = 1.1
        targets.fola = 200
        targets.järn = 11
        targets.zink = 8
      } else if (state.userData.age < 18) {
        targets.tiam = 1.2
        targets.ribo = 1.4
        targets.niek = 16
        targets.vitB6 = 1.3
        targets.fola = 300
        targets.järn = 15
        targets.zink = 9
      } else if (state.userData.age < 31) {
        targets.tiam = 1.1
        targets.ribo = 1.3
        targets.niek = 15
        targets.vitB6 = 1.2
        targets.fola = 400
        targets.järn = 15
        targets.zink = 7
      } else if (state.userData.age < 61) {
        targets.tiam = 1.1
        targets.ribo = 1.2
        targets.niek = 14
        targets.vitB6 = 1.2
        targets.fola = 300
        targets.järn = 15
        targets.zink = 7
      } else if (state.userData.age < 75) {
        targets.tiam = 1.0
        targets.ribo = 1.2
        targets.niek = 13
        targets.vitB6 = 1.3
        targets.fola = 300
        targets.järn = 9
        targets.zink = 7
      } else {
        targets.tiam = 1.0
        targets.ribo = 1.2
        targets.niek = 13
        targets.vitB6 = 1.3
        targets.fola = 300
        targets.järn = 9
        targets.zink = 7
      }
    }

    return targets
  }
}

export default getters;