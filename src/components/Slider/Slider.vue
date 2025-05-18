<template>
  <div 
    class="slider" 
    :class="{ 
      'slider--dragging': isDragging,
      'slider--disabled': isDisabled
    }"
    ref="sliderEl"
  >
    <div 
      class="slider__rail" 
      ref="railEl"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div 
        class="slider__filler" 
        :style="{ width: `${percentage}%` }"
      >
        <div 
          class="slider__line" 
          :style="{ width: '100%' }"
        ></div>
      </div>
      <div 
        class="slider__grabber" 
        :style="{ left: `${percentage}%` }"
        @mousedown.stop="startDrag"
        @touchstart.stop="startDrag"
      >
        <div class="slider__thumb">
          <div class="slider__circle"></div>
        </div>
        <div class="slider__tooltip" :class="{ 'slider__tooltip--visible': isDragging }">
          
          <Tooltip :text="String(displayValue)" :visible="isDragging" class="slider__tooltip-text" position="top"/>
          <!-- <span class="slider__tooltip-text">{{ displayValue }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';

/**
 * An interactive slider component for selecting a value within a range.
 * Features a draggable thumb, visual track/rail, and tooltip showing the current value.
 */

interface SliderProps {
  /** The current value of the slider */
  progress: number;
  
  /** The minimum allowed value */
  min?: number;
  
  /** The maximum allowed value */
  max?: number;
  
  /** The step increment value */
  step?: number;
  
  /** Whether the slider is disabled */
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  isDisabled: false
});

const emit = defineEmits<{
  /** Emitted continuously as the slider value changes */
  'update:progress': [value: number];
  
  /** Emitted when the user stops dragging the slider */
  'change': [value: number];
}>();

const internalValue = ref(props.progress);
const isDragging = ref(false);
const sliderEl = ref<HTMLElement | null>(null);
const railEl = ref<HTMLElement | null>(null);

watch(() => props.progress, (newVal) => {
  internalValue.value = newVal;
});

const percentage = computed(() => {
  return ((internalValue.value - props.min) / (props.max - props.min)) * 100;
});

const displayValue = computed(() => {
  return Math.round(internalValue.value);
});

/**
 * Handles the start of a drag operation
 */
const startDrag = (event: MouseEvent | TouchEvent) => {
  if (props.isDisabled) return;
  
  event.preventDefault();
  isDragging.value = true;
  
  updateValueFromEvent(event);
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
};

/**
 * Updates the slider value based on the current pointer position
 */
const updateValueFromEvent = (event: MouseEvent | TouchEvent) => {
  if (!railEl.value) return;
  
  const rect = railEl.value.getBoundingClientRect();
  
  let clientX: number;
  if ('clientX' in event) {
    clientX = event.clientX;
  } else {
    clientX = event.touches[0].clientX;
  }
  
  let position = (clientX - rect.left) / rect.width;
  position = Math.max(0, Math.min(position, 1));
  
  const newValue = props.min + position * (props.max - props.min);
  const steppedValue = Math.round(newValue / props.step) * props.step;
  const clampedValue = Math.max(props.min, Math.min(props.max, steppedValue));
  
  internalValue.value = clampedValue;
  emit('update:progress', clampedValue);
};

/**
 * Handles the drag movement
 */
const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  
  if ('touches' in event) {
    event.preventDefault();
  }
  
  updateValueFromEvent(event);
};

/**
 * Stops the dragging operation and cleans up event listeners
 */
const stopDrag = () => {
  if (!isDragging.value) return;
  
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
  
  emit('change', internalValue.value);
};

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
});
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: var(--glim-dimension-dimensions-unit-5);
  cursor: pointer;
  touch-action: none;
  user-select: none;
}

.slider__rail {
  position: relative;
  width: 100%;
  height: var(--glim-dimension-dimensions-unit-1);
  background-color: var(--glim-color-solid-200);
  border-radius: var(--glim-dimension-radius-2);
  margin-top: var(--glim-dimension-space-small);
  cursor: pointer;
}

.slider__filler {
  position: relative;
  height: 100%;
  width: 0;
  overflow: visible;
  display: flex;
  align-items: center;
}

.slider__line {
  height: 100%;
  background-color: var(--glim-color-border-strong);
  border-radius: var(--glim-dimension-radius-2);
}

.slider__grabber {
  position: absolute;
  top: -7px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
  z-index: 1;
}

.slider--dragging .slider__grabber {
  cursor: grabbing;
}

.slider__thumb {
  width: var(--glim-dimension-dimensions-unit-6);
  height: var(--glim-dimension-dimensions-unit-6);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-3px);
}

.slider__circle {
  width: var(--glim-dimension-dimensions-unit-4);
  height: var(--glim-dimension-dimensions-unit-4);
  background-color: var(--glim-color-permanent-white, #FFFFFF);
  border: 3px solid var(--glim-color-fg-object-transparent-strong, #111111);
  border-radius: 50%;
  box-sizing: border-box;
  transition: transform 0.1s ease;
}

.slider--dragging .slider__circle {
  transform: scale(1.05);
  border-width: 1.5px;
}

.slider__tooltip {
  position: absolute;
  top: -50px;
  transform: translateY(10px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 0;
} 

.slider__tooltip::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
} 

.slider__tooltip--visible {
  opacity: 1;
  transform: translateY(0);
}

.slider--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.slider--disabled .slider__rail,
.slider--disabled .slider__grabber {
  pointer-events: none;
}
</style> 