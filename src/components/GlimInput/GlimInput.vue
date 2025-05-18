<template>
  <div 
    class="input-wrapper"
    :class="[
      `input-wrapper--${size}`,
      { 'input-wrapper--error': error },
      { 'input-wrapper--success': success },
      { 'input-wrapper--disabled': disabled }
    ]"
  >
    <label 
      v-if="label" 
      :for="id" 
      class="input__label body-xs color-strong"
      :class="`input__label--${size}`"
    >
      {{ label }}
    </label>
    <div class="input__container">
      <Icon 
        v-if="prefixIcon" 
        :name="prefixIcon"
        :size="Number(iconSize)"
        class="input__icon input__icon--prefix"
      />
      <input
        :id="id"
        v-model="localValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : undefined"
        class="input__field body-sm"
        :class="[
          `input__field--${size}`,
          { 'input__field--readonly': readonly }
        ]"
        @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
      />
      <Button
        v-if="showClearButton"
        suffixIcon="x" 
        size="small" 
        variant="ghost"
        class="input__clear-button"
        :class="{ 'input__clear-button--hidden': !localValue }"
        @click="clearInput"
      />
      <Icon 
        v-if="suffixIcon" 
        :name="suffixIcon"
        :size="Number(iconSize)"
        class="input__icon input__icon--suffix"
      />
    </div>
    <span 
      v-if="error" 
      :id="`${id}-error`" 
      class="input__error body-xs"
      :class="`input__error--${size}`"
      role="alert"
    >
      {{ error }}
    </span>
    <span 
      v-if="success" 
      class="input__success body-xs"
      :class="`input__success--${size}`"
    >
      {{ success }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../GlimIcon/GlimIcon.vue'
import Button from '../GlimButton/GlimButton.vue'

/**
 * @component Input
 * @description A form input component with support for various states, icons, and validation.
 * Provides a consistent interface for text input with built-in error handling and visual feedback.
 * 
 * @example <Input v-model="modelValue" label="Username" placeholder="Enter username" />
 * @example <Input v-model="email" type="email" prefixIcon="mail" error="Invalid email format" />
 * @example <Input v-model="search" suffixIcon="search" showClearButton />
 */

/**
 * Input component props
 * @typedef {Object} InputProps
 */
interface Props {
  /**
   * Current value of the input (v-model)
   * @type {string}
   * @required
   */
  modelValue: string
  
  /**
   * Label text displayed above the input
   * @type {string}
   * @default 'Label'
   */
  label?: string
  
  /**
   * Placeholder text displayed when input is empty
   * @type {string}
   * @default 'Placeholder'
   */
  placeholder?: string
  
  /**
   * HTML input type (text, password, email, etc.)
   * @type {string}
   * @default 'text'
   */
  type?: string
  
  /**
   * Size variant of the input
   * @type {'large'|'medium'|'small'}
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'
  
  /**
   * Whether the input is disabled
   * @type {boolean}
   * @default false
   */
  disabled?: boolean
  
  /**
   * Whether the input is read-only
   * @type {boolean}
   * @default false
   */
  readonly?: boolean
  
  /**
   * Error message to display below the input
   * @type {string}
   * @default ''
   */
  error?: string
  
  /**
   * Success message to display below the input
   * @type {string}
   * @default ''
   */
  success?: string
  
  /**
   * Icon to display at the start of the input
   * @type {string}
   * @default ''
   */
  prefixIcon?: string
  
  /**
   * Icon to display at the end of the input
   * @type {string}
   * @default ''
   */
  suffixIcon?: string
  
  /**
   * Unique identifier for the input element
   * Used for accessibility (connecting label and error messages)
   * @type {string}
   * @required
   */
  id: string
  
  /**
   * Whether to show a clear button when the input has a value
   * @type {boolean}
   * @default false
   */
  showClearButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Label',
  placeholder: 'Placeholder',
  type: 'text',
  size: 'medium',
  disabled: false,
  readonly: false,
  error: '',
  success: '',
  prefixIcon: '',
  suffixIcon: '',
  showClearButton: false
})

/**
 * Events emitted by the Input component
 * @typedef {Object} InputEmits
 * @property {Function} update:modelValue - Emitted when the input value changes
 */
const emit = defineEmits(['update:modelValue'])

/**
 * Local computed value for v-model binding
 * @private
 */
const localValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

/**
 * Clears the input value
 */
const clearInput = () => {
  emit('update:modelValue', '')
}

/**
 * Computed property for icon size based on input size
 * @returns {number} Size of icon in pixels
 */
const iconSize = computed(() => {
  switch (props.size) {
    case 'large':
      return 20
    case 'medium':
      return 16
    case 'small':
      return 14
    default:
      return 16
  }
})


</script>

<style>
.input-wrapper {
  display: flex;
  gap: var(--glim-dimension-radius-2);
  flex-direction: column;
  width: 100%;
}

.input__container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--glim-color-border-disabled);
  border-radius: var(--glim-dimension-dimensions-unit-radius-for-surface-clickable);
  transition: all 0.2s ease;
  padding: 0 var(--glim-dimension-padding-2);
}

.input__container:hover {
  border: 1px solid var(--glim-color-border-strong);
}

.input__field {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--glim-color-text-strong);
}

.input__field--large {
  padding: 0 var(--glim-dimension-padding-2);
}

.input__field--medium {
  padding: 0 var(--glim-dimension-padding-2);
}

.input__field--small {
  padding: 0 var(--glim-dimension-padding-2);
}

.input__field:focus {
  outline: none;
}

.input__container:focus-within {
  border-color: var(--glim-color-interaction-focus);
  box-shadow: 0 0 0 2px var(--glim-color-interaction-focus);
  padding: 0 var(--glim-dimension-padding-2);
}

.input__icon {
  color: var(--glim-color-text-soft);
  flex-shrink: 0;
}

.input__icon--prefix {
  margin-left: var(--glim-dimension-space-small);
}

.input__icon--suffix {
  margin-right: var(--glim-dimension-space-small);
}

.input__error {
  color: var(--glim-color-system-danger-default);
}

.input__error--large {
  line-height: var(--glim-line-height-medium);
}

.input__error--medium {
  line-height: var(--glim-line-height-small);
}

.input__error--small {
  line-height: var(--glim-line-height-xsmall);
}

.input__success {
  color: var(--glim-color-system-success-default);
}

.input__success--large {
  line-height: var(--glim-line-height-medium);
}

.input__success--medium {
  line-height: var(--glim-line-height-small);
}

.input__success--small {
  line-height: var(--glim-line-height-xsmall);
}

/* Size variants */
.input-wrapper--large .input__container {
  height: var(--glim-dimension-dimensions-unit-10);
  border-radius: var(--glim-dimension-radius-2);
}

.input-wrapper--medium .input__container {
  height: var(--glim-dimension-dimensions-unit-8);
  border-radius: var(--glim-dimension-radius-2);
}

.input-wrapper--small .input__container {
  height: var(--glim-dimension-dimensions-unit-8);
  border-radius: var(--glim-dimension-radius-2);
}

/* States */
.input-wrapper--error .input__container {
  border-color: var(--glim-color-system-danger-default);
}

.input-wrapper--success .input__container {
  border-color: var(--glim-color-system-success-default);
}

.input-wrapper--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-wrapper--disabled .input__container {
  background-color: var(--glim-color-elements-disabled);
  border-color: var(--glim-color-border-defined);
}

.input-wrapper--disabled .input__field {
  cursor: not-allowed;
}

/* Placeholder styling */
.input__field::placeholder {
  color: var(--glim-color-text-disabled);
}

.input__clear-button {
  margin: 0 var(--glim-dimension-space-tiny);
  opacity: 1;
  transition: opacity 0.2s ease;
}

.input__clear-button--hidden {
  opacity: 0;
  pointer-events: none;
}

.input__field--readonly {
  cursor: default;
  pointer-events: none;
}

/* Change appearance of readonly fields without looking disabled */
.input__field--readonly {
  opacity: 1;
  color: var(--glim-color-text-strong);
}
</style> 