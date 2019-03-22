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
          <transition name="fade">
            <breakdown-tooltip v-if="showTooltips[bar.title]" @mouseover.native="showTooltips[bar.title] = true" @mouseleave.native="showTooltips[bar.title] = false" v-bind="bar" />
          </transition>
        </span>
        <!-- We have to use $set (alias for Vue.set) to make the property reactive -->
        <div class="progress-bar" :key="index + 'p'" @mouseover="$set(showTooltips, bar.title, true)" 
        @mouseleave="showTooltips[bar.title] = false" @touchstart="$set(showTooltips, bar.title, true)" @touchend.prevent="showTooltips[bar.title] = false">
          <div class="meter" :style="`width: ${bar.percent}%; background-color: ${bar.percent >= 100 ? 'lightgreen' : 'lightblue'}`" />
          <span class="progress">{{bar.target ? bar.percent + '%' : 'No target'}}</span>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import breakdownTooltip from '@/components/BreakdownTooltip.vue'

export default {
  components: {
    'breakdown-tooltip': breakdownTooltip
  },
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
    touch(event) {
      alert(event)
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
  }
}
</style>


