<template>
  <section>
    <h3>{{ heading }}</h3>
    <div class="bars">
      <template v-for="(bar, index) in bars">
        <span class="title" :key="index + 'tit'">{{ bar.title }}</span>
        <span class="total" :key="index + 'tot'">{{ bar.total + ' ' }}</span>
        <span class="unit" :key="index + 'u'">
          {{ bar.unit }}
          <!-- Putting the tooltips in here for positioning -->
          <div
            class="tooltip"
            v-show="showTooltips[bar.title]"
            @mouseover="showTooltips[bar.title] = true"
            @mouseleave="showTooltips[bar.title] = false"
          >
            <h4>{{ bar.title }}</h4>
            <span class="tooltip-total">{{ bar.total + ' ' + bar.unit }}</span>
            <span class="tooltip-percent">{{ bar.percent }}%</span>
            <template v-for="(entry, index) in bar.breakdown">
              <span :key="`entry-${index}`" class="tooltip-breakdown-entry">{{ entry.name }}</span>
              <span
                :key="`amount-${index}`"
                class="tooltip-breakdown-amount"
              >{{ entry.value + ' ' + bar.unit }}</span>
              <span :key="`percent-${index}`" class="tooltip-breakdown-percent">
                <strong>{{ getPercent(entry.value, bar.target) }}%</strong>
              </span>
            </template>
          </div>
        </span>
        <!-- We have to use $set (alias for Vue.set) to make the property reactive -->
        <div
          class="progress-bar"
          :key="index + 'p'"
          @mouseover="$set(showTooltips, bar.title, true)"
          @mouseleave="showTooltips[bar.title] = false"
        >
          <div
            class="meter"
            :style="`width: ${bar.percent}%; background-color: ${bar.percent >= 100 ? 'lightgreen' : 'lightblue'}`"
          ></div>
          <span class="progress">{{bar.target ? bar.percent + '%' : 'No target'}}</span>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    bars: {
      type: Array,
      required: true,
      validator: function() {
        // write validation for bars here
        return true;
      }
    },
    heading: {
      type: String,
      required: true,
      validator: function(value) {
        return value.length > 2 && value.length < 15;
      }
    }
  },
  data: function() {
    return { showTooltips: {} };
  },
  methods: {
    getPercent(valueOne, valueTwo) {
      return valueOne && valueTwo ? Math.round((valueOne / valueTwo) * 100) : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.3rem;
  padding: 1rem;

  h3 {
    margin-bottom: 1rem;
  }

  .bars {
    display: grid;
    grid-template-columns: minmax(max-content, 1fr) min-content min-content 1fr;
    grid-gap: 0.4rem;
    align-items: center;
    margin-bottom: 0.3rem;
    position: relative;

    span.title {
      grid-column-start: 1;
    }

    span.total {
      grid-column-start: 2;
      text-align: right;
    }

    span.unit {
      grid-column-start: 3;
      position: relative;
    }

    .progress-bar {
      grid-column-start: 4;
      position: relative;
      background-color: #e0e0e0;
      height: 1.5rem;
      border-radius: 0.3rem;
      text-align: center;
      font-size: 90%;
      font-weight: 600;

      .meter {
        background-color: #f2f20e;
        height: 100%;
        transition: width 0.3s ease;
        border-radius: 0.3rem;
        max-width: 100%;
      }

      span.progress {
        position: absolute;
        top: 0;
        left: 0;
        vertical-align: middle;
        line-height: 1.5rem;
        width: 100%;
      }
    }

    .tooltip {
      position: absolute;
      top: -1rem;
      right: -2rem;
      background-color: whitesmoke;
      border: 1px solid black;
      display: grid;
      grid-template-columns: auto max-content max-content;
      min-width: 220px;
      grid-column-gap: 0.5rem;
      grid-row-gap: 0.2rem;
      z-index: 3;
      padding: 0.2rem;

      .tooltip-percent {
        font-weight: 600;
      }

      .tooltip-total {
        text-align: right;
      }

      .tooltip-breakdown-amount {
        text-align: right;
        font-size: 85%;
      }

      .tooltip-breakdown-entry {
        font-size: 85%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .tooltip-breakdown-percent {
        font-size: 85%;
        font-weight: 600;
      }
    }
  }
}
</style>


