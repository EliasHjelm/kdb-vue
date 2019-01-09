<template>
  <div class="tdee-settings">
    <h3>Inställningar</h3>
    <p>
      Kön:
    </p>
    <select ref="gender" v-model="userGender">
      <option value="male">Man</option>
      <option value="female">Kvinna</option>
    </select>
    <p>Längd:</p>
    <input type="number" ref="height" v-model.lazy="userHeight" @focus="$event.srcElement.select()"><span>cm</span>
    <p>Vikt:</p>
    <input type="number" ref="weight" v-model.lazy="userWeight" @focus="$event.srcElement.select()"><span>kg</span>
    <p>Ålder:</p>
    <input type="number" ref="age" v-model.lazy="userAge" @focus="$event.srcElement.select()">
    <p>Aktivitetsgrad:</p>
    <select ref="activityLevel" v-model="userActivityLevel">
      <option value="sedentary">Stillasittande</option>
      <option value="moderate">Medel</option>
      <option value="high">Hög</option>
    </select>

  </div>
  
</template>

<script>

export default {
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
        return this.$store.state.userData.age
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
    }
  }

  
}
</script>
