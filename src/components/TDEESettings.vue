<template>
  <expanding-card title="Inställningar" :open="open">
    <template slot="content">
      <label for="user-gender">
        Kön:
      </label>
      <select ref="gender" v-model="userGender" id="user-gender">
        <option value="male">Man</option>
        <option value="female">Kvinna</option>
      </select>
      <label for="user-height">Längd:</label>
      <input type="number" ref="height" id="user-height" v-model.lazy="userHeight" @focus="$event.srcElement.select()"><span>cm</span>
      <label for="user-weight">Vikt:</label>
      <input type="number" ref="weight" id ="user-weight" v-model.lazy="userWeight" @focus="$event.srcElement.select()"><span>kg</span>
      <label for="user-age">Ålder:</label>
      <input type="number" ref="age" id="user-age" v-model.lazy="userAge" @focus="$event.srcElement.select()">
      <label for="user-activity-level">Aktivitetsgrad:</label>
      <select ref="activityLevel" id="user-activity-level" v-model="userActivityLevel">
        <option value="sedentary">Stillasittande</option>
        <option value="moderate">Medel</option>
        <option value="high">Hög</option>
      </select>
      <label for="caloric-goal">Mål:</label>
      <select name="caloric-goal" id="caloric-goal" ref="caloricGoal" v-model="userCaloricGoal">
        <option value="surplus">Viktökning</option>
        <option value="deficit">Viktminskning</option>
        <option value="balance">Behåll vikt</option>
      </select>
      <label for="change-amount">Förändring:</label>
      <input type="number" name="change-amount" id="change-amount" ref="changeAmount" v-model.lazy="userWeightChangeAmount" :disabled="userCaloricGoal === 'balance'"> kg/månad
    </template>
  </expanding-card>  
</template>

<script>
import expandingCard from '@/components/ExpandingCard.vue'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'expanding-card': expandingCard
  },
  computed: {
    userGender: {
      get: function() {
        return this.$store.state.userData.gender || 'male'
      },
      set: function() {
        this.$store.dispatch('setUserData', { gender: this.$refs.gender.value });
      }
    },
    userHeight: {
      get: function() {
        return this.$store.state.userData.height || 178
      },
      set: function() {
        this.$store.dispatch('setUserData', { height: +this.$refs.height.value });
      }
    },
    userWeight: {
      get: function() {
        return this.$store.state.userData.weight || 74
      },
      set: function() {
        this.$store.dispatch('setUserData', { weight: +this.$refs.weight.value });
      }
    },
    userAge: {
      get: function() {
        return this.$store.state.userData.age || 28
      },
      set: function() {
        this.$store.dispatch('setUserData', { age: +this.$refs.age.value });
      }
    },
    userActivityLevel: {
      get: function() {
        return this.$store.state.userData.activityLevel || 'sedentary'
      },
      set: function() {
        this.$store.dispatch('setUserData', { activityLevel: this.$refs.activityLevel.value });
      }
    },
    userCaloricGoal: {
      get: function() {
        return this.$store.state.userData.caloricGoal || 'balance'
      },
      set: function() {
        this.$store.dispatch('setUserData', {
          caloricGoal: this.$refs.caloricGoal.value,
          weightChangeAmount: (this.$refs.caloricGoal.value === 'balance')
                              ? 0
                              : (this.$refs.caloricGoal.value === 'surplus')
                              ? Math.abs(this.$refs.changeAmount.value)
                              : -Math.abs(this.$refs.changeAmount.value)
        })
      }
    },
    userWeightChangeAmount: {
      get: function() {
        return this.$store.state.userData.weightChangeAmount || '0'
      },
      set: function() {
        this.$store.dispatch('setUserData', { 
          weightChangeAmount: (this.$store.state.userData.caloricGoal === 'balance')
                              ? 0
                              : (this.$store.state.userData.caloricGoal === 'surplus')
                              ? Math.abs(this.$refs.changeAmount.value)
                              : -Math.abs(this.$refs.changeAmount.value)
          })
      }
    }
  }  
}
</script>