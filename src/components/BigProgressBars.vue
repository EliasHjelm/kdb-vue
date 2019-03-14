<template>
<section>
  <h3>{{ heading }}</h3>
    <div class="bars">
      <template v-for="(bar, index) in bars">
        <span :key="index + 'span'">
          {{ bar.title }}
          <transition name="fade">
            <breakdown-tooltip v-if="showTooltips[bar.title]" @mouseover.native="showTooltips[bar.title] = true" @mouseleave.native="showTooltips[bar.title] = false" v-bind="bar" style="right: -10rem;" />
          </transition>
        </span>
        <div :key="index + 'div'" class="progress-bar" @mouseover="$set(showTooltips, bar.title, true)" @mouseleave="showTooltips[bar.title] = false">
          <div class="meter" :style="`width: ${bar.percent}%; background-color: ${bar.color}`"></div>
          <span>{{ `${bar.total}${bar.unit} / ${bar.target}${bar.unit} (${bar.percent}%)` }}</span>          
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
      validator: function () {
        // write validation for bars here
        return true
      }
    },
    heading: {
      type: String,
      required: true,
      validator: function (value) {
        return value.length > 2 && value.length < 15
      }
    }
  },
  data: function() {
    return {
      showTooltips: {}
    }
  }  
}
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
    grid-template-columns: auto 1fr;
    grid-gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.3rem;

    span {
        grid-column-start: 1;
        position: relative;
      }
    
    .progress-bar {
      grid-column-start: 2;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

}

</style>


