<template>
  <div 
    class="spinner" 
    :style="{ 
      width: typeof size === 'number' ? `${size}px` : size,
      height: typeof size === 'number' ? `${size}px` : size,
      borderColor: color 
    }"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
/**
 * @component Spinner
 * @description A loading spinner component that provides visual feedback during asynchronous operations.
 * The spinner can be customized with different sizes and colors.
 * 
 * @example <Spinner />
 * @example <Spinner size="32px" color="var(--glim-color-primary)" />
 * @example <Spinner size="16" color="#ff0000" />
 */

/**
 * Spinner component props
 * @typedef {Object} SpinnerProps
 */
defineProps({
  /**
   * Size of the spinner
   * Controls the dimensions of the spinner element
   * @type {String|Number}
   * @default 24
   */
  size: {
    type: [String, Number],
    default: 24
  },
  /**
   * Color of the spinner
   * Can be a CSS color value or a CSS variable
   * @type {String}
   * @default 'currentColor'
   */
  color: {
    type: String,
    default: 'currentColor'
  }
})
</script>

<style>
.spinner {
  display: inline-block;
  border: 2px solid;
  border-right-color: transparent !important;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 