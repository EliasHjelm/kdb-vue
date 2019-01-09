<template>
  <app-modal @close="$emit('close')">    
    <template slot="content">
      <div class="modal-header">
        <h3>Lägg till livsmedel</h3>
      </div>
      <div class="modal-body">
        <input type="text" name="search-foods" id="search-foods" placeholder="Sök efter livsmedel..." v-model="searchString" @input="getSuggestions">
        <select name="food-search-results" id="food-search-results" size="10" ref="addFoodSelect" @change="selectFoodItem">
          <option v-for="suggestion in searchSuggestions" :key="suggestion.id">{{ suggestion.name }}</option>
        </select>
      </div>
      <div class="modal-footer" v-if="selectedItem.name">
        <input type="number" name="grams" id="grams" v-model="inputGrams" ref="inputGrams" @keyup.enter="addFoodItem"> g - {{ prospectiveCalories }} kcal
        <button @click="addFoodItem">Lägg till</button>
      </div>
    </template>
  </app-modal>  
</template>

<script>
import modal from "@/components/Modal.vue";
import Vue from "vue";

export default {
  components: {
    "app-modal": modal
  },
  data() {
    return {
      showModal: false,
      searchString: "",
      searchSuggestions: [],
      selectedItem: {},
      inputGrams: 100
    };
  },

  computed: {
    prospectiveCalories() {
      return Math.round(
        this.inputGrams * 0.01 * this.selectedItem.nutrition.kcal.value
      );
    }
  },

  created() {
    this.getSuggestions();
  },

  methods: {
    closeModal() {
      this.showModal = false;
      this.searchString = "";
      this.searchSuggestions = [];
    },
    openAddFoodModal() {
      this.showModal = true;
      this.getSuggestions();
    },
    async getSuggestions() {
      const response = await fetch("http://localhost:3001/autocomplete", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: this.searchString
        })
      });
      this.searchSuggestions = await response.json();
      this.$refs.addFoodSelect.scrollTop = 0;
      this.$refs.addFoodSelect.selectedIndex = -1;
      this.selectedItem = {};
    },
    async selectFoodItem() {
      const index = this.$refs.addFoodSelect.selectedIndex;
      this.selectedItem = this.searchSuggestions[index];
      await Vue.nextTick();
      this.$refs.inputGrams.select();
    },
    addFoodItem() {
      const toEnter = this.selectedItem;
      toEnter.type = "food";
      toEnter.date = this.$store.state.selectedDate;
      toEnter.quantity = Number(this.inputGrams);
      toEnter.unit = "g";
      toEnter.user = this.$store.state.user.uid;
      if (this.$store.state.loggedIn) {
        this.addFoodItemToDB(toEnter);
      } else {
        this.addFoodItemLocally(toEnter);
      }
      this.$emit("close");
    },
    async addFoodItemToDB(toEnter) {
      await this.db.collection('users').doc(this.$store.state.user.uid).collection('entries').add(toEnter);
    },
    addFoodItemLocally(toEnter) {
      this.$store.dispatch("addEntry", toEnter);
    }
  }
};
</script>

