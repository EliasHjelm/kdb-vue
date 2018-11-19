<template>
  <div>
    <div class="add-entry-buttons">
      <button class="open-add-food" @click="openAddFoodModal">Lägg till livsmedel</button>
      <button class="open-add-activity" @click="openAddActivityModal">Lägg till aktivitet</button>
      <button class="open-add-data">Lägg till data</button>
    </div>
  <app-modal v-if="showModal" @close="closeModal">
    
    <template slot="content" v-if="addFood">
      <div class="modal-header">
        <h3>Lägg till livsmedel</h3>
      </div>
      <div class="modal-body">
        <input type="text" name="search-foods" id="search-foods" placeholder="Sök efter livsmedel..." v-model="searchString" @input="getSuggestions">
        <select name="food-search-results" id="food-search-results" size="10" ref="addFoodSelect" @select="selectFoodItem" v-model="selectedItemName">
          <option v-for="suggestion in searchSuggestions" :key="suggestion.id">{{ suggestion }}</option>
        </select>
      </div>
      <div class="modal-footer" v-if="selectedItemName">
        <input type="number" name="grams" id="grams" v-model="inputGrams"> g
      </div>
    </template>

    <template slot="content" v-if="addActivity">
      <h3>Lägg till aktivitet</h3>
    </template>

  </app-modal> 
  </div>
</template>

<script>
import modal from "@/components/Modal.vue";

export default {
  components: {
    "app-modal": modal
  },
  data() {
    return {
      showModal: false,
      addFood: false,
      addActivity: false,
      addData: false,
      searchString: "",
      searchSuggestions: [],
      selectedItem : {},
      selectedItemName : '',
      inputGrams: 100
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.addFood = false;
      this.addActivity = false;
      this.addData = false;
      this.searchString = '';
      this.searchSuggestions = [];
    },
    openAddFoodModal() {
      this.showModal = true;
      this.addFood = true;
      this.getSuggestions();
    },
    openAddActivityModal() {
      this.showModal = true;
      this.addActivity = true;
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
      this.selectedItemName = '';
    },
    async selectFoodItem() {
      this.selectedItem = this.$refs.addFoodSelect
    }
  }
};
</script>

