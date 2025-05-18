<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      { 'button--loading': loading },
      { 'button--disabled': disabled },
      { 'button--inverse': inverse },
      { 'button--icon-only': !$slots.default }
    ]"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled"
    :type="type"
    :name="name"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <div v-if="!loading" class="button__content-wrapper">
      <Icon 
        v-if="prefixIcon" 
        :name="prefixIcon"
        :size="iconSize"
        class="button__icon button__icon--prefix"
        aria-hidden="true"
      />
      
      <span v-if="$slots.default" class="button__content">
        <slot></slot>
      </span>
      
      <Icon 
        v-if="suffixIcon"
        :name="suffixIcon"
        :size="iconSize"
        class="button__icon button__icon--suffix"
        aria-hidden="true"
      />
    </div>

    <span v-if="loading" class="button__loader" aria-hidden="true"></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'

/**
 * @component Button
 * @description A versatile button component with multiple variants, sizes, and states.
 * Supports icons, loading states, and inverse color schemes.
 * 
 * @example <Button>Click me</Button>
 * @example <Button variant="secondary" size="medium">Secondary Button</Button>
 * @example <Button prefixIcon="arrow-right">With Icon</Button>
 * @example <Button loading>Loading</Button>
 */

const props = defineProps({
  /**
   * Whether the button is disabled
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  },

  /**
   * Icon to display before the button content
   * Uses Feather icon names
   * @type {string}
   * @default ''
   */
  prefixIcon: {
    type: String,
    default: ''
  },

  /**
   * Icon to display after the button content
   * Uses Feather icon names
   * @type {string}
   * @default ''
   */
  suffixIcon: {
    type: String,
    default: ''
  },

  /**
   * Size of the button
   * Controls padding, font size, and overall dimensions
   * @type {'large'|'medium'|'small'}
   * @default 'medium'
   */
  size: {
    type: String as () => 'large' | 'medium' | 'small',
    default: 'medium',
    validator: (value: string) => ['large', 'medium', 'small'].includes(value)
  },

  /**
   * Whether the button is in loading state
   * When true, displays a spinner and disables interactions
   * @type {boolean}
   * @default false
   */
  loading: {
    type: Boolean,
    default: false
  },

  /**
   * Visual style variant of the button
   * - primary: Main call-to-action
   * - secondary: Alternative or less prominent action
   * - ghost: Subtle or auxiliary action (previously tertiary)
   * - danger: Destructive or warning action
   * @type {'primary'|'secondary'|'ghost'|'danger'}
   * @default 'primary'
   */
  variant: {
    type: String as () => 'primary' | 'secondary' | 'ghost' | 'danger',
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'ghost', 'danger'].includes(value)
  },

  /**
   * Whether to use inverse color scheme
   * Useful for buttons on dark backgrounds
   * @type {boolean}
   * @default false
   */
  inverse: {
    type: Boolean,
    default: false
  },
  
  /**
   * Button type attribute (button, submit, reset)
   * @type {'button'|'submit'|'reset'}
   * @default 'button'
   */
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value)
  },
  
  /**
   * Name attribute for the button
   * @type {string}
   * @default ''
   */
  name: {
    type: String,
    default: ''
  }
})

/**
 * Icon sizes mapped to button sizes
 * @private
 */
const ICON_SIZE_MAP = {
  large: 20,
  medium: 16,
  small: 12
} as const

/**
 * Computes the icon size based on button size
 * @private
 */
const iconSize = computed<number>(() => {
  return ICON_SIZE_MAP[props.size as keyof typeof ICON_SIZE_MAP] || 16
})

/**
 * Define emitted events
 */
const emit = defineEmits<{
  /**
   * Emitted when the button is clicked and not disabled or loading
   */
  'click': []
}>()

/**
 * Handle button click event
 * @private
 */
function handleClick() {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}
</script>

<style lang="css" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--glim-dimension-gap-3);
  border: none;
  font-family: var(--glim-typography-text);
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: auto;
  min-width: 0;
}

/* Size variants */
.button--large {
  padding: var(--glim-dimension-padding-4) var(--glim-dimension-padding-5);
  font-size: var(--glim-dimension-font-size-16);
  border-radius: var(--glim-dimension-radius-3);
}

.button--medium {
  padding: var(--glim-dimension-padding-3) var(--glim-dimension-dimensions-unit-3);
  font-size: var(--glim-dimension-font-size-14);
  border-radius: var(--glim-dimension-radius-3);
}

.button--small {
  padding: var(--glim-dimension-padding-2) var(--glim-dimension-padding-3);
  font-size: var(--glim-dimension-font-size-12);
  border-radius: var(--glim-dimension-radius-2);
}

/* Icon-only variants */
.button--icon-only {
  min-width: 0;
}

.button--icon-only.button--large {
  padding: var(--glim-dimension-padding-3);
  aspect-ratio: 1;
}

.button--icon-only.button--medium {
  padding: var(--glim-dimension-padding-3);
  aspect-ratio: 1;
}

.button--icon-only.button--small {
  padding: var(--glim-dimension-padding-1);
  aspect-ratio: 1;
}

/* Variant styles */
.button--primary {
  background-color: var(--glim-color-elements-default);
  color: var(--glim-color-text-strong-inverse);
}
.button--primary:hover {
  background-color: var(--glim-color-elements-hover);
}

.button--primary:active {
  background-color: var(--glim-color-elements-pressed);
}

.button--primary:focus {
  background-color: var(--glim-color-elements-default);
  outline: var(--glim-dimension-border-focus) solid var(--glim-color-interaction-focus);
  outline-offset: var(--glim-dimension-radius-1);
}

/* Inverse variants */
.button--inverse.button--primary {
  background-color: var(--glim-color-text-strong-inverse);
  color: var(--glim-color-elements-default);
  border: var(--glim-dimension-border-focus) solid var(--glim-color-elements-default);
}
.button--inverse.button--primary:hover {
  background-color: var(--glim-color-text-strong-inverse);
  color: var(--glim-color-elements-hover);
  border-color: var(--glim-color-elements-hover);
}
.button--inverse.button--primary:active {
  background-color: var(--glim-color-text-strong-inverse);
  color: var(--glim-color-elements-pressed);
  border-color: var(--glim-color-elements-pressed);
}

.button--inverse.button--secondary {
  background-color: var(--glim-color-text-strong);
  color: var(--glim-color-text-strong-inverse);
  border: var(--glim-dimension-border-focus) solid var(--glim-color-text-strong-inverse);
}
.button--inverse.button--secondary:hover {
  background-color: var(--glim-color-text-strong);
  opacity: 0.9;
}
.button--inverse.button--secondary:active {
  background-color: var(--glim-color-text-strong);
  opacity: 0.8;
}

.button--inverse.button--ghost {
  background-color: transparent;
  color: var(--glim-color-text-strong-inverse);
}
.button--inverse.button--ghost:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.button--inverse.button--ghost:active {
  background-color: rgba(255, 255, 255, 0.2);
}

.button--inverse.button--danger {
  background-color: var(--glim-color-text-strong-inverse);
  color: var(--glim-color-interaction-danger-danger);
  border: var(--glim-dimension-border-focus) solid var(--glim-color-interaction-danger-danger);
}
.button--inverse.button--danger:hover {
  background-color: var(--glim-color-text-strong-inverse);
  color: var(--glim-color-interaction-danger-danger-hover);
  border-color: var(--glim-color-interaction-danger-danger-hover);
}
.button--inverse.button--danger:active {
  background-color: var(--glim-color-text-strong-inverse);
  color: var(--glim-color-bg-clickable-danger-danger-pressed);
  border-color: var(--glim-color-bg-clickable-danger-danger-pressed);
}

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed !important;
}

.button--primary.button--disabled {
  background-color: var(--glim-color-elements-disabled);
}

.button--secondary {
  background-color: transparent;
  color: var(--glim-color-text-strong);
  border: var(--glim-dimension-border-focus) solid var(--glim-color-border-defined);
}
.button--secondary:hover {
  background-color: var(--glim-color-interaction-hover);
}
.button--secondary:active {
  background-color: var(--glim-color-interaction-pressed);
}
.button--secondary.button--disabled {
  color: var(--glim-color-text-disabled);
  border-color: var(--glim-color-border-disabled);
}
.button--secondary:focus {
  outline: var(--glim-dimension-border-focus) solid var(--glim-color-interaction-focus);
  outline-offset: var(--glim-dimension-radius-1);
}

.button--ghost {
  background-color: transparent;
  color: var(--glim-color-text-strong);
}
.button--ghost:hover {
  background-color: var(--glim-color-interaction-hover);
}
.button--ghost:active {
  background-color: var(--glim-color-interaction-pressed);
}
.button--ghost.button--disabled {
  color: var(--glim-color-text-disabled);
}
.button--ghost:focus {
  outline: var(--glim-dimension-border-focus) solid var(--glim-color-interaction-focus);
  outline-offset: var(--glim-dimension-radius-1);
}

.button--danger {
  background-color: var(--glim-color-system-error-default);
  color: var(--glim-color-text-strong-inverse);
}
.button--danger:hover {
  background-color: var(--glim-color-system-error-strong);
}
.button--danger:active {
  background-color: var(--glim-color-system-error-default);
}
.button--danger.button--disabled {
  background-color: var(--glim-color-system-error-subtle);
}
.button--danger:focus {
  outline: var(--glim-dimension-border-focus) solid var(--glim-color-interaction-focus);
  outline-offset: var(--glim-dimension-radius-1);
}

.button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button--loading {
  cursor: wait;
  position: relative;
  opacity: 1;
}

.button__loader {
  display: inline-block;
  width: var(--glim-dimension-dimensions-unit-5);
  height: var(--glim-dimension-dimensions-unit-5);
  border: var(--glim-dimension-border-focus) solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: loader-spin 0.8s linear infinite;
}

.button--large .button__loader {
  width: var(--glim-dimension-dimensions-unit-6);
  height: var(--glim-dimension-dimensions-unit-6);
  border-width: calc(var(--glim-dimension-border-focus) + 0.5px);
}

.button--medium .button__loader {
  width: var(--glim-dimension-dimensions-unit-5);
  height: var(--glim-dimension-dimensions-unit-5);
  border-width: var(--glim-dimension-border-focus);
}

.button--small .button__loader {
  width: var(--glim-dimension-dimensions-unit-3);
  height: var(--glim-dimension-dimensions-unit-3);
  border-width: calc(var(--glim-dimension-border-focus) - 0.5px);
}

@keyframes loader-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.button__content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--glim-dimension-gap-3);
  width: 100%;
}
</style> 