<template>
  <div class="progress-bar-container">
    <div class="progress-bar" :style="{ height }">
      <div 
        class="progress-bar__fill" 
        :style="{ width: `${progress}%` }"
        :class="{
          'progress-bar__fill--looping': looping,
          'progress-bar__fill--progress': !looping
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component GlimProgressBar
 * @description A progress bar component that can show determinate progress or an indeterminate loading state
 */
import { computed } from 'vue';

const props = defineProps({
  /**
   * Current progress value (0-100)
   */
  value: {
    type: Number,
    required: true,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100
  },
  
  /**
   * Whether to show the progress value as a percentage
   */
  showValue: {
    type: Boolean,
    default: false
  },
  
  /**
   * Size variant of the progress bar
   */
  size: {
    type: String as () => 'small' | 'medium' | 'large',
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  },
  
  /**
   * Whether the progress bar is indeterminate
   */
  indeterminate: {
    type: Boolean,
    default: false
  },

  /**
   * Custom height for the progress bar
   * @example '8px', '1rem', 12
   */
  height: {
    type: [String, Number],
    default: '8px'
  }
});

const progress = computed(() => props.value);
const looping = computed(() => props.indeterminate);

defineExpose({
  /**
   * Current progress percentage
   */
  progress,
  /**
   * Whether the progress bar is in looping/indeterminate state
   */
  looping
});
</script>

<style scoped>
.progress-bar-container {
  width: 100%;
  display: block;
}

.progress-bar {
  width: 100%;
  border-radius: var(--glim-dimension-radius-2);
  background-color: var(--glim-color-solid-200);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--glim-color-transparent-strong);
  border-radius: var(--glim-dimension-radius-2);
  min-height: var(--glim-dimension-dimensions-unit-1);
}

.progress-bar__fill--looping {
  animation: indeterminate 1.5s infinite linear;
  width: 40% !important;
}

.progress-bar__fill--progress {
  transition: width 0.3s ease-in-out;
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(250%);
  }
}
</style> 