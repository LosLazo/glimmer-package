<template>
  <div class="badge" :class="{ 'badge--dot': isDot }">
    <span v-if="!isDot" class="body-xs-loud">
      {{ formattedContent }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * @component Badge
 * @description Displays a small numerical value or indicator that can be used for notifications, counts, or status indicators.
 * The badge can be displayed as a number with optional maximum value or as a simple dot.
 * 
 * @example <Badge content="5" />
 * @example <Badge content="100" max="99" />
 * @example <Badge isDot />
 * @example <Badge content="NEW" />
 */

/**
 * Badge component props
 * @typedef {Object} BadgeProps
 */
const props = defineProps({
  /**
   * Content to be displayed inside the badge
   * @type {Number|String}
   * @default 0
   */
  value: {
    type: [Number, String],
    default: 0
  },
  /**
   * Maximum value to show before adding a '+' suffix
   * If the value exceeds this number, it will display as "{max}+"
   * @type {Number}
   * @default 99
   */
  max: {
    type: Number,
    default: 99
  },
  /**
   * Whether to display as a small dot without content
   * When true, the badge appears as a simple colored dot indicator
   * @type {Boolean}
   * @default false
   */
  isDot: {
    type: Boolean,
    default: false
  }
})

/**
 * Formats the badge content based on the max prop
 * @returns {String|Number} Formatted value with '+' suffix if it exceeds the max
 */
const formattedContent = computed(() => {
  if (typeof props.value === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value
  }
  return props.value
})
</script>

<style>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  background-color: var(--color-danger, #D83B3A);
  border-radius: 4px;
  color: #FFFFFF;
}

.badge:not(.badge--dot) {
  padding: 4px 8px;
}

.badge--dot {
  width: 8px;
  height: 8px;
  min-width: unset;
  padding: 0;
  border-radius: 50%;
}

</style> 