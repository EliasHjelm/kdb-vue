<template>
  <div class="home">
    <div class="settings-column">
      <tdee-settings/>
    </div>
    <div class="main-view">
      <add-entry-buttons/>
      <div class="display-data">
        <date-picker/>
        <display-entries/>
        <div class="macros-and-micros">
          <macro-targets/>
          <mineral-targets/>
          <vitamin-targets/>
          <!-- <micro-targets/> -->
        </div>
      </div>
      <patreon-link />
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/DatePicker.vue";
import addEntryButtons from "@/components/AddEntryButtons.vue";
import displayEntries from "@/components/DisplayEntries.vue";
import TDEESettings from "@/components/TDEESettings.vue";
import macroTargets from "@/components/MacroTargets.vue";
// import microTargets from "@/components/MicroTargets.vue";
import vitaminTargets from "@/components/VitaminTargets.vue";
import mineralTargets from "@/components/MineralTargets.vue";
import patreonLink from "@/components/PatreonLink.vue";

export default {
  name: "home",
  components: {
    "date-picker": datePicker,
    "add-entry-buttons": addEntryButtons,
    "display-entries": displayEntries,
    "tdee-settings": TDEESettings,
    "macro-targets": macroTargets,
    // "micro-targets": microTargets,
    "vitamin-targets": vitaminTargets,
    "mineral-targets": mineralTargets,
    "patreon-link": patreonLink
  }
};
</script>
