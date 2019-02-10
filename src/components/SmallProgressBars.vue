<template>
  <section>
    <h3>{{ heading }}</h3>
    <div class="bar" v-for="bar in bars" :key="bar.id">
      <span class="title">{{ bar.title }}</span>
      <span class="total">{{ bar.total + ' ' }}</span>
      <span class="unit">{{ bar.unit }}</span>
      <div class="progress-bar">
        <div class="meter" :style="`width: ${bar.percent}%; background-color: ${bar.percent >= 100 ? 'lightgreen' : 'lightblue'}`"></div>
        <span>{{bar.target ? bar.percent + '%' : 'No target'}}</span>
      </div>
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

  .bar {
    display: grid;
    grid-template-columns: 40% 15% 10% auto;
    grid-row-gap: 0.6rem;
    grid-column-gap: 0.6rem;
    align-items: center;
    margin-bottom: 0.3rem;

    span.title {
      grid-column-start: 1;
    }

    span.total {
      grid-column-start: 2;
      text-align: right;
    }

    span.unit {
      grid-column-start: 3
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

      span {
        position: absolute;
        top: 0;
        left: 0;
        vertical-align: middle;
        line-height: 1.5rem;
        width: 100%;
      }
    }
  }
}
</style>


