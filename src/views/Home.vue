<template>
  <div class="home">
    <div class="settings-column">
      <tdee-settings/>
      <div class="ad-container">
        <!-- <img src="@/assets/images/160X600.jpg" alt="Fake advertisement"> -->
      </div>
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

<style lang="scss">
.home {
  flex-grow: 1;
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 10fr;
  grid-column-gap: 10px;
  padding: 10px;
  align-items: start;
  max-width: 1100px;

  .settings-column {

    .ad-container {
      display: flex;
      justify-content: center;
    }
  }

  @media screen and (max-width: $breakpoint-desktop) {
    grid-template-columns: 1fr;
    .settings-column {
      display: none;
    }
  }


  .macros-and-micros {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    grid-gap: 1rem;
    align-items: start;
    @media screen and (min-width: $breakpoint-tablet) {
      grid-template-columns: 1fr 1fr;
    }    
  }  
}
</style>
