<template>
  <app-modal @close="$emit('close')">
    <template slot="content">
      <div class="modal-header">
        <h3>Lägg till vikt</h3>
      </div>
      <div class="modal-footer">
        <span>
          <input type="number" name="user-weight" v-model="weight" ref="weightInput"> kg
        </span>
        <button @click="addWeight" >Lägg till</button>
      </div>
    </template>
  </app-modal>
</template>

<script>
import modal from '@/components/Modal.vue'

export default {
  components: {
    'app-modal': modal
  },
  data() {
    return {
      weight: this.$store.state.userData.weight
    }
  },
  mounted() {
    this.$refs.weightInput.select();
  },
  methods: {
    addWeight() {
      const entry = { 
        quantity: +this.weight,
        type: 'weight',
        date: this.$store.state.selectedDate,
        unit: 'kg',
        name: 'Vikt'
      }
      if (this.$store.state.loggedIn) {
        this.addWeightToDb(entry)
      } else {
        this.addWeightLocally(entry)
      }
    },
    async addWeightToDb(entry) {
      try {
        await this.db.collection('entries').doc(this.$store.state.user.uid).collection(this.$store.state.selectedDate).add(entry)
        this.$emit("close");
      } catch (e) {
        console.error(e)
      }
    },
    addWeightLocally(entry) {
      this.$store.dispatch("addEntry", entry);
      this.$emit("close");
    }
  }
}
</script>

