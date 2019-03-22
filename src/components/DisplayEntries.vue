<template>
  <div>
  <section class="display-entries">
    <span><strong>Namn</strong></span>
    <span><strong>Mängd</strong></span>
    <span><strong>kcal</strong></span>
    <span><strong>X</strong></span>
    <template v-for="entry in entries">
      
      <span :key="entry.id + 'name'" @click.stop="selectEntry($event, entry)" :class="getClassName(entry)">{{ entry.name }}</span>
      <span :key="entry.id + 'amount'" :class="getClassName(entry)" @click.stop="selectEntry($event, entry)">
        <input
            type="number"
            :value="entry.quantity"
            @change="updateQuantity(entry, $event.srcElement.value)"
            @focus="$event.srcElement.select()"
          >
          {{ entry.unit }}
      </span>
      <span :key="entry.id + 'kcal'" :class="getClassName(entry)" @click.stop="selectEntry($event, entry)">{{ calculateKcal(entry) }}</span>
      <span :key="entry.id + 'rm'" :class="getClassName(entry)"><button @click="deleteEntry(entry.id)">X</button></span>
    </template>
  </section>
  <app-spinner v-if="loadingEntries" />
  </div>
</template>

<script>
import db from "@/main.js";
import spinner from '@/components/Spinner.vue'

export default {
  components: {
    "app-spinner": spinner,
  },
  computed: {
    entries() {
      return this.$store.getters.allEntries;
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
      } else {
        return '-'
      }
    },

    updateQuantity(entry, quantity) {
      if (this.$store.state.loggedIn) {
        db.collection("entries").doc(this.$store.state.user.uid).collection(entry.type === 'weight' ? 'weight' : this.$store.state.selectedDate).doc(entry.id)
          .set({ quantity: +quantity }, { merge: true });
      } else {
        // we have to clone it as to not mutate state directly
        const entries = JSON.parse(JSON.stringify(this.$store.state.dailyEntries))
        const index = entries.findIndex(oldEntry => oldEntry.id === entry.id)
        entries[index] = { ...entries[index], quantity: quantity }
        this.$store.dispatch('setEntries', entries)
      }
    },

    async deleteEntry(entryId) {

      this.$store.dispatch('setSelectedEntry', false);
      if (this.$store.state.loggedIn) {
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
      } else {
        const entries = this.$store.state.dailyEntries.filter(entry => entry.id !== entryId)
        this.$store.dispatch('setEntries', entries)

      }
    },

    selectEntry(event, entry) {
      if (!/^<input/.test(event.target.outerHTML)) {
        if (this.$store.state.selectedEntry === entry) {
          // this means we clicked the selected entry
          this.$store.dispatch('setSelectedEntry', false);
        } else {
          this.$store.dispatch('setSelectedEntry', entry);
        }
      }
    },

    getClassName(entry) {
      return entry === this.$store.state.selectedEntry ? 'selected-entry' : ''
    }
  }
};
</script>


<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: 20fr minmax(max-content, 4fr) minmax(max-content, 3fr) min-content;
  margin-bottom: 20px;

  span {
    border: 1.5px solid rgb(222, 226, 230);
    border-right-width: 0;
    border-top-width: 0;
    padding: 0.2rem 0.6rem;
    transition: background-color 0.2s;
    cursor: pointer;

    

    &:nth-child(4n) {
      border-right-width: 1.5px;
      text-align: center;
    }

    &:nth-child(-n + 4) {
      border-top-width: 1.5px;
      padding: 0.5rem;
      cursor: default;
      &:hover {
        background-color: #fff;
      }
    }

    &:nth-child(4n + 1) {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:nth-child(8n + 5), &:nth-child(8n + 6), &:nth-child(8n + 7), &:nth-child(8n + 8) {
      background-color: #f4f4f4
    }

    &:hover {
      background-color: #eee;
    }

    &.selected-entry {
      background-color: #bbb;

      &:hover {
        background-color: #aaa;
      }
    }
    

    input {
      width: 40px;
      margin-right: 5px;
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      padding: 2px;
    }
  }
}
</style>

