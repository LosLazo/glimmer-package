<script setup lang="ts">
/**
 * @component GlimToggle
 * @description A toggle switch component for boolean inputs, similar to a checkbox but with a sliding visual design.
 * Used for enabling/disabling settings or features.
 * 
 * @example <GlimToggle v-model="enabled" />
 * @example <GlimToggle v-model="darkMode" size="small" />
 * @example <GlimToggle v-model="notifications" disabled />
 */

import { computed } from 'vue';

/**
 * @prop modelValue - Current state of the toggle (v-model)
 * @prop disabled - Whether the toggle is disabled
 * @prop size - Size variant for the toggle
 */
interface Props {
  /**
   * Current state of the toggle
   * @type {boolean|string}
   * @required
   */
  modelValue: boolean | string;
  
  /**
   * Whether the toggle is disabled
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Size variant for the toggle
   * @type {'small'|'default'}
   * @default 'default'
   */
  size?: 'small' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'default'
});

/**
 * @event update:modelValue - Emitted when the toggle state changes
 */
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

/**
 * Computed value to handle both boolean and string inputs
 */
const isActive = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.modelValue === 'true';
  }
  return props.modelValue;
});

/**
 * Toggles the switch state when clicked
 * Does nothing if the toggle is disabled
 */
const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !isActive.value);
  }
};
</script>

<template>
  <button
    :class="[
      'toggle',
      `toggle--${size}`,
      {
        'toggle--active': isActive,
        'toggle--disabled': disabled
      }
    ]"
    type="button"
    role="switch"
    :aria-checked="isActive"
    :disabled="disabled"
    @click="toggle"
  >
    <span class="toggle__track">
      <span class="toggle__thumb" />
    </span>
  </button>
</template>

<style scoped>
.toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--glim-dimension-dimensions-unit-radius-for-surface-clickable);
}

.toggle--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* inactive track */
.toggle__track {
  display: inline-flex;
  align-items: center;
  width: var(--glim-dimension-dimensions-unit-8);
  height: var(--glim-dimension-dimensions-unit-6);
  padding: var(--glim-dimension-padding-1);
  border-radius: var(--glim-dimension-radius-4);
  background-color: var(--glim-color-solid-400);
  transition: background-color 0.2s ease;
}

.toggle--small .toggle__track {
  width: 36px;
  height: var(--glim-dimension-dimensions-unit-5);
  border-radius: var(--glim-dimension-radius-5);
}

/* thumb */
.toggle__thumb {
  position: relative;
  width: var(--glim-dimension-dimensions-unit-5);
  height: var(--glim-dimension-dimensions-unit-5);
  border-radius: 50%;
  background-color: var(--glim-color-solid-100);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateX(0);
  transition: transform 0.2s ease;
}

.toggle--small .toggle__thumb {
  width: var(--glim-dimension-dimensions-unit-4);
  height: var(--glim-dimension-dimensions-unit-4);
}

.toggle--active .toggle__thumb {
  transform: translateX(var(--glim-dimension-gap-3));
}

.toggle--small.toggle--active .toggle__thumb {
  transform: translateX(var(--glim-dimension-gap-3));
}

/* active track */
.toggle--active .toggle__track {
  background-color: var(--glim-color-solid-900);
}

.toggle--active .toggle__thumb {
  transform: translateX(var(--glim-dimension-gap-3));
}
</style> 