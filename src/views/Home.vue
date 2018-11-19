<template>
  <div class="home">
    <date-picker />
    <add-entry-buttons />
  </div>
</template>

<script>
import datePicker from '@/components/DatePicker.vue';
import addEntryButtons from '@/components/AddEntryButtons.vue';

export default {
  name: 'home',
  components: {
    'date-picker': datePicker,
    'add-entry-buttons': addEntryButtons
  }
}
</script>
