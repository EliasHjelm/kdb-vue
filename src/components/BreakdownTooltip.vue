<template>
  <div class="tooltip" ref="div"> 
    <h4>
      {{ title }}
    </h4>
    <span class="tooltip-total">{{ total + ' ' + unit }}</span>
    <span class="tooltip-percent">{{ percent }}%</span>
    <template v-for="(entry, index) in breakdown">
      <span :key="`entry-${index}`" class="tooltip-breakdown-entry">{{ entry.name }}</span>
      <span :key="`amount-${index}`" class="tooltip-breakdown-amount">{{ entry.value + ' ' + unit }}</span>
      <span :key="`percent-${index}`" class="tooltip-breakdown-percent">
        <strong>{{ getPercent(entry.value, target) }}%</strong>
      </span>
    </template>
  </div>
</template>

<script>
// put this tooltip inside a position:relative element
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    total: {
      type: Number,
    },
    unit: String,
    percent: Number,
    breakdown: Array,
    target: Number
  },
  methods: {
    getPercent(valueOne, valueTwo) {
      return valueOne && valueTwo ? Math.round((valueOne / valueTwo) * 100) : 0;
    }
  }
}
</script>

<style lang="scss">
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
  box-shadow: 1px 1px 1px #000;
  user-select: none;

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
</style>


