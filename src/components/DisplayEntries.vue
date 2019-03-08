<template>
  <div class="display-entries">
    <table v-if="!loadingEntries">
      <tr>
        <th>Namn</th>
        <th>Mängd</th>
        <th>kcal</th>
        <th>Ta Bort</th>
      </tr>
      <tr v-for="entry in entries" :key="entry.id" @click="selectEntry($event, entry)">
        <td>{{ entry.name }}</td>
        <td>
          <input
            type="number"
            :value="entry.quantity"
            @change="updateQuantity(entry.id, $event.srcElement.value)"
            @focus="$event.srcElement.select()"
          >
          {{ entry.unit }}
        </td>
        <td>{{ calculateKcal(entry) }}</td>
        <td>
          <button @click="deleteEntry(entry.id)">X</button>
        </td>
      </tr>
    </table>
    <app-spinner v-if="loadingEntries" />
  </div>
</template>

<script>
import db from "@/main.js";
import spinner from '@/components/Spinner.vue'

export default {
  components: {
    "app-spinner": spinner
  },
  computed: {
    entries() {
      return this.$store.state.dailyEntries;
    },
    loadingEntries() {
      return this.$store.state.loadingEntries
    }
  },

  methods: {
    calculateKcal(entry) {
      if (entry.type === "food") {
        return Math.round(entry.nutrition.kcal.value * entry.quantity * 0.01);
      } else if (entry.type === "activity") {
        return Math.round((entry.kcal * entry.quantity) / 60);
      }
    },

    updateQuantity(entryId, quantity) {
      db.collection("entries")
        .doc(this.$store.state.user.uid)
        .collection(this.$store.state.selectedDate)
        .doc(entryId)
        .set(
          {
            quantity: quantity
          },
          { merge: true }
        );
    },

    async deleteEntry(entryId) {

      this.$store.dispatch('setSelectedEntry', false);
      // error handling does not work atm
      try {
        const result = await db
          .collection("entries")
          .doc(this.$store.state.user.uid)
          .collection(this.$store.state.selectedDate)
          .doc(entryId)
          .delete();
        console.log("Document successfully deleted:", result);
      } catch (error) {
        console.error("Could not remove document:", entryId);
      }
    },

    selectEntry(event, entry) {
      event.stopPropagation();
      if (event.srcElement.outerHTML !== '<input type="number">' && event.srcElement.outerHTML !== '<button>X</button>') {
        for (let child of event.srcElement.parentElement.parentElement.children) {
          child.classList.remove("selected-entry");
        }
        if (this.$store.state.selectedEntry === entry) {
          // this means we clicked the selected entry
          this.$store.dispatch('setSelectedEntry', false);
        } else {
          this.$store.dispatch('setSelectedEntry', entry);
          event.srcElement.parentElement.classList.add('selected-entry');
        }
      }
    }
  }
};
</script>

