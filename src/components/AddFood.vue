<template>
  <app-modal @close="$emit('close')">    
    <template slot="content">
      <div class="modal-header">
        <h3>Lägg till livsmedel</h3>
      </div>
      <div class="modal-body">
        <input type="text" name="search-foods" id="search-foods" placeholder="Sök efter livsmedel..." ref="foodSearchInput" @input="updateSearch($event)" @keydown.escape="$emit('close')">
        <ul v-if="searchSuggestions.length" id="food-search-results" ref="addFoodSelect">
          <li v-for="suggestion in searchSuggestions" :key="suggestion.id" @click="selectFoodItem($event, suggestion)" :class="selectedItem.name === suggestion ? 'selected' : ''">{{ suggestion }}</li>
        </ul>
        <p v-else>
          Inga sökträffar för "{{searchString}}"
        </p>
      </div>
      <div class="modal-footer">
        <template v-if="selectedItem.name">
          <span>
            <input type="number" name="grams" id="grams" v-model="inputGrams" ref="inputGrams" @keydown.enter="addFoodItem" @keydown.escape="$emit('close')"> g - {{ prospectiveCalories }} kcal
          </span>
          <button @click="addFoodItem">Lägg till</button>
        </template>
        <app-spinner v-if="this.loadingFoodItem" />
      </div>
    </template>
  </app-modal>  
</template>

<script>
import modal from "@/components/Modal.vue";
import Vue from "vue";
import spinner from '@/components/Spinner.vue';

export default {
  components: {
    "app-modal": modal,
    "app-spinner": spinner
  },
  data() {
    return {
      showModal: false,
      searchString: "",
      selectedItem: {},
      inputGrams: 100,
      foodNames: require('@/assets/json/lvm-names.json'),
      loadingFoodItem: false,
      entriesCount: 0
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
    },
    closeModal() {
      this.showModal = false;
      this.searchString = "";
      this.searchSuggestions = [];
    },
    openAddFoodModal() {
      this.showModal = true;
    },
    updateSearch(event) {
      this.deselectFood()
      this.searchString = event.target.value
    },
    async selectFoodItem(event, name) {
      event.srcElement.classList.add('selected')
      this.selectedItem = false
      this.loadingFoodItem = true;
      const snapshot = await this.db.collection('foodItems').doc(name).get();
      event.srcElement.classList.remove('selected')
      this.selectedItem = snapshot.data();
      this.loadingFoodItem = false;
      await Vue.nextTick();
      this.$refs.inputGrams.select();
    },
    addFoodItem() {
      const toEnter = this.selectedItem;
      toEnter.type = "food";
      toEnter.date = this.$store.state.selectedDate;
      toEnter.quantity = Number(this.inputGrams);
      toEnter.unit = "g";
      if (this.$store.state.loggedIn) {
        this.addFoodItemToDB(toEnter);
      } else {
        this.addFoodItemLocally(toEnter);
      }
      this.$emit("close");
    },
    async addFoodItemToDB(toEnter) {
      await this.db.collection('entries').doc(this.$store.state.user.uid).collection(this.$store.state.selectedDate).add(toEnter);
    },
    addFoodItemLocally(toEnter) {
      this.$store.dispatch("addEntry", toEnter);
    }
  }
};
</script>

