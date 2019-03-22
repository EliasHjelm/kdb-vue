import Vue from 'vue';
import Vuex from 'vuex';
import getters from '@/store/getters.js';
import mutations from '@/store/mutations.js';
import actions from '@/store/actions.js'

Vue.use(Vuex);

//Helper functions

function formatDate(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

const defaultUserData = {
  gender: 'male',
  height: 178,
  weight: 74,
  age: 28,
  activityLevel: 'sedentary',
  caloricAdjustment: 0
}

const nutrientNames = {
  C120: 'Laurinsyra',
  C140: 'Myristinsyra',
  C160: 'Palmitinsyra',
  C161: 'Palmitoljesyra',
  C180: 'Stearinsyra',
  C181: 'Oljesyra',
  C182: 'Linolsyra',
  C183: 'Linolensyra',
  C200: 'Arakadinsyra',
  C204: 'Arakidonsyra',
  DHA: 'DHA',
  DPA: 'DPA',
  EPA: 'EPA',
  alko: 'Alkohol',
  aska: 'Aska',
  avfall: 'Avfall (skal etc)',
  beta: 'β-Karoten',
  disa: 'Disackarider',
  enke: 'Summa enkelomättade fettsyror',
  fett: 'Fett',
  fibr: 'Fibrer',
  fler: 'Summa fleromättade fettsyror',
  fola: 'Folat',
  fosf: 'Fosfor',
  full: 'Fullkorn',
  jod: 'Jod',
  järn: 'Järn',
  kalc: 'Kalcium',
  kali: 'Kalium',
  kcal: 'Kcal',
  kole: 'Kolesterol',
  kolh: 'Kolhydrater',
  kopp: 'Koppar',
  magn: 'Magnesium',
  mono: 'Monosackarider',
  mätt: 'Summa mättade fettsyror',
  natr: 'Natrium',
  niac: 'Niacin',
  niek: 'Vitamin B3',
  prot: 'Protein',
  reti: 'Retinol',
  ribo: 'Riboflavin',
  sack: 'Sackaros',
  salt: 'Salt',
  sele: 'Selen',
  sock: 'Sockerarter',
  stär: 'Stärkelse',
  tiam: 'Tiamin',
  vatt: 'Vatten',
  vitA: 'Vitamin A',
  vitB12: 'Vitamin B12',
  vitB6: 'Vitamin B6',
  vitC: 'Vitamin C',
  vitD: 'Vitamin D',
  vitE: 'Vitamin E',
  vitK: 'Vitamin K',
  zink: 'Zink'
}

const nutrientUnits = {
  // nutrients not listed use 'g' as unit
  avfall: '%',
  beta: 'µg',
  fola: 'µg',
  fosf: 'mg',
  jod: 'µg',
  järn: 'mg',
  kalc: 'mg',
  kali: 'mg',
  kcal: 'kcal',
  kole: 'mg',
  kopp: 'mg',
  magn: 'mg',
  natr: 'mg',
  niac: 'mg',
  niek: 'mg',
  reti: 'µg',
  ribo: 'mg',
  sele: 'µg',
  tiam: 'mg',
  vitA: 'µg',
  vitB12: 'µg',
  vitB6: 'mg',
  vitC: 'mg',
  vitD: 'µg',
  vitE: 'mg',
  vitK: 'µg',
  zink: 'mg'
}

//Actual store

export default new Vuex.Store({
  state: {
    user: {},
    userData: defaultUserData,
    loggedIn: false,
    selectedDate: formatDate(new Date()),
    dailyEntries: [],
    dailyBiometrics: [],
    selectedEntry: false,
    unsubscribe: function () {  },
    nutrientNames: nutrientNames,
    nutrientUnits: nutrientUnits,
    loadingEntries: false,
    media: {
      desktop: window.matchMedia('(min-width: 1024px)').matches
    }
  },

  getters: getters,
  mutations: mutations,
  actions: actions
});

//export date formatting function and default userdata so mutations can use them

export { formatDate, defaultUserData };