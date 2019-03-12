<template>
  <div class="tdee-settings">
    <div class="settings-header">
      <h3>Inställningar</h3>
      <span @click="toggleSettingsBody">{{toggleIcon}}</span>
    </div>
    <div class="settings-body" v-if="displaySettingsBody">
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

  </div>
  
</template>

<script>

export default {
  data: function() {
    return {
      toggleIcon: '↑',
      displaySettingsBody: true
      }
  },

  methods: {
    toggleSettingsBody() {
      this.displaySettingsBody = !this.displaySettingsBody;
      this.toggleIcon = this.toggleIcon === '↓' ? '↑' : '↓';
    }
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
    }
  }

  
}
</script>

<style lang="scss" scoped>
.tdee-settings {
  border: 0.07rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
  padding: 1rem;

  .settings-header {
    display: grid;
    grid-template-columns: minmax(20px, 1fr) min-content minmax(50px, 1fr);

    h3 {
      grid-column-start: 2;
      text-align: center;
      font-weight: 600;
    }

    span {
      text-align: center;
      font-size: 150%;
      cursor: pointer;
    }
  }


  p {
    margin: 1rem 0 0.6rem;
    font-size: 120%;
    font-weight: 400;
  }

  select {
    border: 0.07rem solid rgba(0, 0, 0, 0.3);
    border-radius: 0.2rem;
    padding: 0.2rem 0.1rem;
  }

  input {
    border: 0.07rem solid rgba(0, 0, 0, 0.3);
    border-radius: 0.2rem;
    padding: 0.2rem 0.1rem;
    width: 50%;
    min-width: 3rem;
    margin-right: 0.3rem;
  }
}
</style>
