<script setup lang="ts">
/**
 * @component Checkbox
 * @description A checkbox component for boolean inputs with customizable label and sizing.
 * Follows accessibility best practices and provides visual feedback for different states.
 * 
 * @example <Checkbox v-model="isChecked" />
 * @example <Checkbox v-model="agreeToTerms" label="I agree to the terms and conditions" />
 * @example <Checkbox v-model="rememberMe" size="small" label="Remember me" />
 * @example <Checkbox v-model="isDisabled" disabled />
 */

/**
 * Checkbox component props
 * @typedef {Object} CheckboxProps
 */

interface Props {
  /**
   * Current state of the checkbox (v-model)
   * @type {boolean}
   * @required
   */
  modelValue: boolean;
  
  /**
   * Whether the checkbox is disabled
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Size variant for the checkbox
   * @type {'small'|'default'}
   * @default 'default'
   */
  size?: 'small' | 'default';
  
  /**
   * Text label displayed next to the checkbox
   * @type {string}
   * @default ''
   */
  label?: string;

  /**
   * Optional id for the checkbox input
   * @type {string}
   * @default ''
   */
  id?: string;

  /**
   * Error message for the checkbox
   * @type {string}
   * @default ''
   */
  error?: string;

  /**
   * Success message for the checkbox
   * @type {string}
   * @default ''
   */
  success?: string;

  /**
   * Whether the checkbox is in an indeterminate state
   * @type {boolean}
   * @default false
   */
  indeterminate?: boolean;
}

const props = defineProps<Props>();

/**
 * Events emitted by the Checkbox component
 * @typedef {Object} CheckboxEmits
 * @property {Function} update:modelValue - Emitted when the checkbox state changes
 */
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
};
</script>

<template>
  <label
    :class="[
      'checkbox',
      `checkbox--${size}`,
      {
        'checkbox--disabled': disabled
      }
    ]"
  >
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      :disabled="disabled"
      @input="toggle"
      class="checkbox__input"
    />
    <span class="checkbox__box">
      <svg
        v-if="modelValue"
        class="checkbox__check"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="label" class="checkbox__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--glim-dimension-space-small);
  cursor: pointer;
  user-select: none;
}

.checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--glim-dimension-dimensions-unit-6);
  height: var(--glim-dimension-dimensions-unit-6);
  border: 1px solid var(--glim-color-border-defined);
  border-radius: var(--glim-dimension-radius-2);
  background-color: var(--glim-color-solid-100);
  transition: none;
}

.checkbox--small .checkbox__box {
  width: var(--glim-dimension-dimensions-unit-5);
  height: var(--glim-dimension-dimensions-unit-5);
}

.checkbox__input:focus-visible + .checkbox__box {
  border-color: var(--glim-color-interaction-focus);
  box-shadow: 0 0 0 2px var(--glim-color-interaction-focus);
}

.checkbox__input:checked + .checkbox__box {
  background-color: var(--glim-color-elements-default);
  border-color: var(--glim-color-elements-default);
}

.checkbox__input:not(:disabled):hover + .checkbox__box {
  border: 2px solid var(--glim-color-border-strong);
}

.checkbox__check {
  width: var(--glim-dimension-dimensions-unit-4);
  height: var(--glim-dimension-dimensions-unit-4);
  color: var(--glim-color-text-strong-inverse);
}

.checkbox--small .checkbox__check {
  width: var(--glim-dimension-dimensions-unit-3);
  height: var(--glim-dimension-dimensions-unit-3);
}

.checkbox__label {
  font-size: var(--glim-dimension-dimensions-unit-font-size-300);
  line-height: var(--glim-dimension-dimensions-unit-line-height-300);
  color: var(--glim-color-text-strong);
}

.checkbox--disabled .checkbox__label {
  color: var(--glim-color-text-soft);
}
</style> 