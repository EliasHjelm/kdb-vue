<template>
  <app-modal @close="$emit('close')">    
    <template slot="content">
      <div class="modal-header">
        <h3>Lägg till aktivitet</h3>
      </div>
      <div class="modal-body">
        <input type="text" name="search-activities" id="search-activities" placeholder="Sök efter aktivitet..." @input="getSuggestions($event)">
        <ul id="activity-search-results" ref="addActivitySelect">
          <li v-for="(suggestion, index) in searchSuggestions" :key="suggestion.id" @click="selectActivity(index)" :class="suggestion.name === selectedItem.name ? 'selected' : ''">{{ suggestion.name }}</li>
        </ul>
      </div>
      <div class="modal-footer" v-if="selectedItem.name">
        <input type="number" name="minutes" id="minutes" v-model="inputMinutes" ref="inputMinutes" @keyup.enter="addActivity"> min - {{ prospectiveCalories }} kcal
        <button @click="addActivity">Lägg till</button>
      </div>
    </template>
  </app-modal>  
</template>

<script>
import modal from "@/components/Modal.vue";
import Vue from "vue";
const ACTIVITIES = require("@/assets/json/aktiviteter.json");

export default {
  components: {
    "app-modal": modal
  },
  data() {
    return {
      showModal: false,
      searchString: "",
      selectedItem: {},
      inputMinutes: 60,
      activities: ACTIVITIES
    };
  },

  mounted() {
    this.deselectActivity();
  },

  computed: {
    prospectiveCalories() {
      return Math.round(this.inputMinutes * this.selectedItem.kcal / 60);
    },
    searchSuggestions() {
      const input = this.searchString.toLowerCase();
      if (!input) {
        return this.activities
      }
      const suggestions = this.activities
        .filter(activity => activity.name.toLowerCase().includes(input))
        .sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        })
        .slice(0, 20)
        .sort((a, b) => {
          // advanced
          // prioritize when finding the str
          // as a separate word
          let aIsSeparateWord = (" " + a.name + " ")
            .toLowerCase()
            .includes(" " + input + " ");
          let bIsSeparateWord = (" " + b.name + " ")
            .toLowerCase()
            .includes(" " + input + " ");

          // prioritize input early in name
          let aPos =
            a.name.toLowerCase().indexOf(input) - (aIsSeparateWord ? 1000 : 0);
          let bPos =
            b.name.toLowerCase().indexOf(input) - (bIsSeparateWord ? 1000 : 0);

          if (aPos === bPos) {
            // if same position
            // sort alphabetically by name
            return a.name < b.name ? -1 : 1;
          }

          return aPos < bPos ? -1 : 1;
        });
      return suggestions;
    }
  },

  methods: {
    closeModal() {
      this.showModal = false;
      this.searchString = '';
    },
    getSuggestions(event) {
      this.selectedItem = {};
      this.searchString = event.target.value
    },
    deselectActivity() {
      this.selectedItem = {};
    },
    async selectActivity(index) {
      this.selectedItem = this.searchSuggestions[index];
      await Vue.nextTick();
      this.$refs.inputMinutes.select();
    },
    addActivity() {
      const toEnter = this.selectedItem;
      toEnter.type = "activity";
      toEnter.date = this.$store.state.selectedDate;
      toEnter.quantity = Number(this.inputMinutes);
      toEnter.unit = "min";
      if (this.$store.state.loggedIn) {
        this.addActivityToDB(toEnter);
      } else {
        this.addActivityLocally(toEnter);
      }
      this.$emit("close");
    },
    async addActivityToDB(toEnter) {
      await this.db.collection('entries').doc(this.$store.state.user.uid).collection(this.$store.state.selectedDate).add(toEnter);
    },
    addActivityLocally(toEnter) {
      this.$store.dispatch("addEntry", toEnter);
    }
  }
};
</script>

