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
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    default: 50
  },
  looping: {
    type: Boolean,
    default: false
  },
  height: {
    type: [String, Number],
    default: '8px'
  }
})
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