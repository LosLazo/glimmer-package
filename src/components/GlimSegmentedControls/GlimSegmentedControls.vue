<script setup lang="ts">
/**
 * @name GlimSegmentedControls
 * @description A component that provides a set of mutually exclusive options, similar to radio buttons but with a cohesive, button-like appearance.
 * Commonly used for switching between views or toggling related options.
 * 
 * @displayName Segmented Controls
 * @status stable
 * @category Input Controls
 * 
 * @example Basic Usage
 * ```vue
 * <GlimSegmentedControls
 *   v-model="selectedOption"
 *   :items="[
 *     { id: 'day', label: 'Day' },
 *     { id: 'week', label: 'Week' },
 *     { id: 'month', label: 'Month', disabled: true }
 *   ]"
 *   size="default"
 * />
 * ```
 */

import { computed, onMounted, ref, watch, nextTick } from 'vue';

interface SegmentItem {
  /**
   * Unique identifier for the segment
   */
  id: string | number;
  
  /**
   * Display text for the segment
   */
  label: string;
  
  /**
   * Whether the segment is disabled
   */
  disabled?: boolean;
}

interface Props {
  /**
   * The selected value, should match an item's id
   */
  modelValue: string | number | undefined;
  
  /**
   * Array of items to display as segments
   */
  items: Array<SegmentItem>;
  
  /**
   * Size of the segmented controls
   * @default 'default'
   */
  size?: 'small' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  size: 'default',
  items: () => [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ]
});

// Compute the default value from the first item in the items array
const defaultModelValue = computed(() => {
  return props.items[0]?.id || ''
});

// Use the provided model value or fall back to the default value
const selectedValue = computed(() => {
  return props.modelValue === undefined ? defaultModelValue.value : props.modelValue;
});

/**
 * Define emitted events
 */
const emit = defineEmits<{
  /**
   * Emitted when the selected segment changes
   * @param value - The id of the selected segment
   */
  'update:modelValue': [value: string | number];
}>();

/**
 * Select a segment by its id
 * @param id - The id of the segment to select
 */
const selectSegment = (id: string | number) => {
  if (props.items.find(item => item.id === id)?.disabled) return;
  emit('update:modelValue', id);
};

const segmentControls = ref<HTMLElement | null>(null);

// Create a computed style for the background
const backgroundStyle = computed(() => {
  const activeIndex = props.items.findIndex(item => item.id === selectedValue.value);
  const index = activeIndex >= 0 ? activeIndex : 0;
  const count = props.items.length || 1;
  
  return {
    width: `calc((100% - 4px) / ${count})`,
    transform: `translateX(calc(${index} * 100%))`,
  };
});

// Watch for changes to the selected value and update the background position
watch(() => selectedValue.value, () => {
  nextTick(() => updateBackgroundPosition());
});

// Watch for changes to the items and update the background width
watch(() => props.items, () => {
  nextTick(() => updateBackgroundPosition());
}, { deep: true });

// Update the background position and width
function updateBackgroundPosition() {
  if (segmentControls.value) {
    const background = segmentControls.value.querySelector('.segmented-controls__background') as HTMLElement;
    if (background) {
      const activeIndex = props.items.findIndex(item => item.id === selectedValue.value);
      const index = activeIndex >= 0 ? activeIndex : 0;
      const count = props.items.length || 1;
      
      background.style.width = `calc((100% - 4px) / ${count})`;
      background.style.transform = `translateX(calc(${index} * 100%))`;
    }
    
    // Ensure all items are properly interactive
    const items = segmentControls.value.querySelectorAll('.segmented-controls__item') as NodeListOf<HTMLElement>;
    items.forEach((item) => {
      item.style.opacity = '1';
      item.style.pointerEvents = 'auto';
      item.classList.remove('segmented-controls__item--disabled');
    });
  }
}

onMounted(() => {
  // Make sure component is initialized as interactive
  nextTick(() => {
    updateBackgroundPosition();
    // Extra safety measure: disable any disabled state that might be set
    if (segmentControls.value) {
      segmentControls.value.querySelectorAll('.segmented-controls__item--disabled')
        .forEach(item => item.classList.remove('segmented-controls__item--disabled'));
    }
  });
});
</script>

<template>
  <div
    :class="[
      'segmented-controls',
      `segmented-controls--${size}`
    ]"
    role="radiogroup"
    ref="segmentControls"
  >
    <div 
      class="segmented-controls__background"
      :class="{
        'segmented-controls__background--small': size === 'small'
      }"
      :style="backgroundStyle"
    />
    <button
      v-for="item in items"
      :key="item.id"
      class="segmented-controls__item"
      :class="{
        'segmented-controls__item--active': selectedValue === item.id,
        'segmented-controls__item--disabled': item.disabled
      }"
      role="radio"
      :aria-checked="selectedValue === item.id"
      :disabled="item.disabled"
      @click="selectSegment(item.id)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.segmented-controls {
  display: inline-flex;
  padding: var(--glim-dimension-padding-1);
  background-color: var(--glim-color-solid-200);
  border-radius: var(--glim-dimension-radius-2);
  position: relative;
  opacity: 1 !important; /* Force opacity to ensure it doesn't appear disabled */
  pointer-events: auto !important; /* Ensure interaction is enabled */
}

.segmented-controls--small {
  border-radius: var(--glim-dimension-radius-2);
}

.segmented-controls__background {
  position: absolute;
  left: 2px;
  height: calc(100% - 4px);
  background-color: var(--glim-color-elevation-base);
  border-radius: var(--glim-dimension-radius-2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, width 0.2s ease;
  z-index: 0;
}

.segmented-controls__background--small {
  border-radius: var(--glim-dimension-radius-2);
}

.segmented-controls__item {
  position: relative;
  padding: 8px 16px;
  border: none;
  width: 100%;
  background: none;
  color: var(--glim-color-text-soft);
  cursor: pointer;
  border-radius: var(--glim-dimension-radius-2);
  z-index: 1;
  transition: color 0.2s ease;
  opacity: 1 !important; /* Force opacity to ensure it doesn't appear disabled */
  pointer-events: auto !important; /* Ensure interaction is enabled */
}

.segmented-controls--small .segmented-controls__item {
  padding: var(--glim-dimension-padding-1) var(--glim-dimension-padding-2);
  border-radius: var(--glim-dimension-radius-2);
}

.segmented-controls__item:hover:not(.segmented-controls__item--disabled) {
  color: var(--glim-color-text-soft);
}

.segmented-controls__item--active {
  color: var(--glim-color-text-strong);
}

.segmented-controls__item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 