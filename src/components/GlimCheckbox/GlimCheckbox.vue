<script setup lang="ts">
/**
 * @component GlimCheckbox
 * @description A checkbox component for boolean inputs with customizable label and sizing.
 * Follows accessibility best practices and provides visual feedback for different states.
 * 
 * @example <GlimCheckbox v-model="isChecked" />
 * @example <GlimCheckbox v-model="agreeToTerms" label="I agree to the terms and conditions" />
 * @example <GlimCheckbox v-model="rememberMe" size="small" label="Remember me" />
 * @example <GlimCheckbox v-model="isDisabled" disabled />
 * @example <GlimCheckbox v-model="value" error="This field is required" />
 * @example <GlimCheckbox v-model="value" success="Valid selection" />
 * @example <GlimCheckbox v-model="value" indeterminate />
 */

/**
 * Checkbox component props
 * @typedef {Object} CheckboxProps
 */

interface Props {
  /**
   * Current state of the checkbox (v-model)
   * @type {boolean}
   * @default false
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
   */
  id?: string;

  /**
   * Error message for the checkbox
   * @type {string}
   */
  error?: string;

  /**
   * Success message for the checkbox
   * @type {string}
   */
  success?: string;

  /**
   * Whether the checkbox is in an indeterminate state
   * @type {boolean}
   * @default false
   */
  indeterminate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  size: 'default',
  label: '',
  id: '',
  error: '',
  success: '',
  indeterminate: false
});

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
  <div class="glim-checkbox-container">
    <label
      :class="[
        'checkbox',
        `checkbox--${size}`,
        {
          'checkbox--disabled': disabled,
          'checkbox--error': error,
          'checkbox--success': success
        }
      ]"
    >
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @input="toggle"
        class="checkbox__input"
      />
      <span class="checkbox__box">
        <svg
          v-if="modelValue && !indeterminate"
          class="checkbox__check"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M20 6L9 17L4 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-if="indeterminate"
          class="checkbox__indeterminate"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 12H19"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span v-if="label" class="checkbox__label">{{ label }}</span>
    </label>
    <div v-if="error" class="checkbox__error">{{ error }}</div>
    <div v-if="success" class="checkbox__success">{{ success }}</div>
  </div>
</template>

<style scoped>
.glim-checkbox-container {
  display: flex;
  flex-direction: column;
  gap: var(--glim-dimension-space-2);
}

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
  transition: all 0.2s ease;
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

.checkbox__check,
.checkbox__indeterminate {
  width: var(--glim-dimension-dimensions-unit-4);
  height: var(--glim-dimension-dimensions-unit-4);
  color: var(--glim-color-text-strong-inverse);
}

.checkbox--small .checkbox__check,
.checkbox--small .checkbox__indeterminate {
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

.checkbox--error .checkbox__box {
  border-color: var(--glim-color-feedback-error);
}

.checkbox--success .checkbox__box {
  border-color: var(--glim-color-feedback-success);
}

.checkbox__error {
  font-size: var(--glim-dimension-dimensions-unit-font-size-200);
  line-height: var(--glim-dimension-dimensions-unit-line-height-200);
  color: var(--glim-color-feedback-error);
}

.checkbox__success {
  font-size: var(--glim-dimension-dimensions-unit-font-size-200);
  line-height: var(--glim-dimension-dimensions-unit-line-height-200);
  color: var(--glim-color-feedback-success);
}
</style> 