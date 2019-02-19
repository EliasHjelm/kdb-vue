<template>
  <app-modal @close="$emit('close')">    
    <template slot="content">
      <div class="modal-header">
        <h3>Lägg till livsmedel</h3>
      </div>
      <div class="modal-body">
        <input type="text" name="search-foods" id="search-foods" placeholder="Sök efter livsmedel..." ref="foodSearchInput" v-model="searchString" @input="deselectFood" @keydown.escape="$emit('close')">
        <select name="food-search-results" id="food-search-results" size="10" ref="addFoodSelect" @change="selectFoodItem">
          <option v-for="suggestion in searchSuggestions" :key="suggestion.id">{{ suggestion }}</option>
        </select>
      </div>
      <div class="modal-footer" v-if="selectedItem.name">
        <input type="number" name="grams" id="grams" v-model="inputGrams" ref="inputGrams" @keyup.enter="addFoodItem" @keydown.escape="$emit('close')"> g - {{ prospectiveCalories }} kcal
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
      selectedItem: {},
      inputGrams: 100,
      foodNames: require('@/assets/json/lvm-names.json')
    };
  },

  mounted() {
    this.deselectFood();
    this.$refs.foodSearchInput.focus();
  },

  computed: {
    prospectiveCalories() {
      return Math.round(
        this.inputGrams * 0.01 * this.selectedItem.nutrition.kcal.value
      );
    },
    searchSuggestions() {
      {
      const input = this.searchString.toLowerCase();
      if (!input) {
        return this.foodNames.slice(0, 20);
      }
      const suggestions = this.foodNames
        .filter(foodName => foodName.toLowerCase().includes(input))
        .sort((a, b) => {
          return a < b ? -1 : 1;
        })
        .slice(0, 20)
        .sort((a, b) => {
          // prioritize when finding the str
          // as a separate word
          let aIsSeparateWord = (" " + a + " ")
            .toLowerCase()
            .includes(" " + input + " ");
          let bIsSeparateWord = (" " + b + " ")
            .toLowerCase()
            .includes(" " + input + " ");

          // prioritize input early in name
          let aPos =
            a.toLowerCase().indexOf(input) - (aIsSeparateWord ? 1000 : 0);
          let bPos =
            b.toLowerCase().indexOf(input) - (bIsSeparateWord ? 1000 : 0);

          if (aPos === bPos) {
            // if same position
            // sort alphabetically by name
            return a < b ? -1 : 1;
          }

          return aPos < bPos ? -1 : 1;
        });
      return suggestions;
    }
    }
  },

  methods: {
    deselectFood() {
      this.selectedItem = {};
      this.$refs.addFoodSelect.selectedIndex = -1;
    },
    closeModal() {
      this.showModal = false;
      this.searchString = "";
      this.searchSuggestions = [];
    },
    openAddFoodModal() {
      this.showModal = true;
    },
    async selectFoodItem() {
      const index = this.$refs.addFoodSelect.selectedIndex;
      const foodName = this.searchSuggestions[index];
      const snapshot = await this.db.collection('foodItems').doc(foodName).get();
      this.selectedItem = snapshot.data();
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
    },
    closeOnEsc(event) {
      console.log(event)
    }
  }
};
</script>

