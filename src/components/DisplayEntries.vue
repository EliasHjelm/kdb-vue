<template>
  <div class="display-entries">
    <table>
      <tr>
        <th>Beskrivning</th>
        <th>Mängd</th>
        <th>Kalorier</th>
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
  </div>
</template>

<script>
import db from "@/main.js";

export default {
  computed: {
    entries() {
      return this.$store.state.dailyEntries;
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
      db.collection("users")
        .doc(this.$store.state.user.uid)
        .collection("entries")
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
      // error handling does not work
      try {
        await db
          .collection("users")
          .doc(this.$store.state.user.uid)
          .collection("entries")
          .doc(entryId)
          .delete();
        console.log("Document successfully deleted:", entryId);
      } catch (error) {
        console.error("Could not remove document:", entryId);
      }
    },

    selectEntry(event, entry) {
      event.stopPropagation();
      console.log(event.srcElement.outerHTML);
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

