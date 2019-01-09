<template>
  <div class="home">
    <date-picker />
    <add-entry-buttons />
    <tdee-settings />
    <div class="display-data">
      <display-entries />
      <div class="macros-and-micros">
        <macro-targets />
      </div>
    </div>
  </div>
</template>

<script>
import datePicker from '@/components/DatePicker.vue';
import addEntryButtons from '@/components/AddEntryButtons.vue';
import displayEntries from '@/components/DisplayEntries.vue';
import TDEESettings from '@/components/TDEESettings.vue';
import macroTargets from '@/components/MacroTargets.vue';
const lvmNames = require('@/assets/json/lvm-names.json');
const lvmData = require('@/assets/json/lvm-data-no-id.json');

export default {
  name: 'home',
  components: {
    'date-picker': datePicker,
    'add-entry-buttons': addEntryButtons,
    'display-entries': displayEntries,
    'tdee-settings': TDEESettings,
    'macro-targets': macroTargets
  },
  mounted() {
      this.db.collection('users').get().then(snapshot => {
        console.log(snapshot.size)
      })
  }
}
</script>
