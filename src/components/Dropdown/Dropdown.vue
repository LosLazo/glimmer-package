<template>
  <div class="dropdown" :class="{ 'dropdown--expanded': isExpanded }">
    <div 
      class="dropdown__control"
      @click="toggleDropdown"
    >
      <Input
        :id="id"
        :modelValue="displayValue"
        @update:modelValue="handleInputChange"
        :label="label"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        :error="error"
        :success="success"
        :prefixIcon="prefixIcon"
        suffixIcon="chevron-down"
        :class="{ 'dropdown__input--expanded': isExpanded }"
        :readonly="!editable"
      />
    </div>
    <div v-if="isExpanded" class="dropdown__menu">
      <Menu :items="processedOptions" @click="handleItemClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Input from '../Input/Input.vue'
import Menu from '../Menu/Menu.vue'

/**
 * @component Dropdown
 * @description An input component with dropdown menu functionality.
 * Combines the functionality of an input field with selectable options.
 * @example
 * <Dropdown
 *   id="dropdown1"
 *   v-model="selectedOption"
 *   :items="[{label: 'Option 1'}, {label: 'Option 2'}]"
 *   label="Select an option"
 * />
 */

interface Props {
  /**
   * Current value of the input field
   * @required
   */
  modelValue: string
  
  /**
   * Label text for the input field
   * @default 'Label'
   */
  label?: string
  
  /**
   * Placeholder text for the input field
   * @default 'Placeholder'
   */
  placeholder?: string
  
  /**
   * Size of the input field
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Error message to display
   * @default ''
   */
  error?: string
  
  /**
   * Success message to display
   * @default ''
   */
  success?: string
  
  /**
   * Icon to display before the input text
   * @default ''
   */
  prefixIcon?: string
  
  /**
   * Unique identifier for the input field
   * @required
   */
  id: string
  
  /**
   * Array of options to display in the dropdown
   * @required
   */
  items: Array<{ label: string; value?: string; selected?: boolean }>
  
  /**
   * Whether the input text can be edited manually
   * @default false
   */
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Label',
  placeholder: 'Placeholder',
  size: 'medium',
  disabled: false,
  error: '',
  success: '',
  prefixIcon: '',
  editable: false
})

/**
 * Define emitted events
 */
const emit = defineEmits<{
  /**
   * Emitted when the input value changes
   * @param value - The new input value
   */
  'update:modelValue': [value: string]
  
  /**
   * Emitted when an option is selected from the dropdown
   * @param item - The selected item object
   */
  'select': [item: { label: string; value?: string }]
}>()

/**
 * Whether the dropdown is currently expanded
 * @private
 */
const isExpanded = ref(false)

/**
 * The value to display in the input field
 * @private
 */
const displayValue = computed(() => {
  return props.modelValue || props.placeholder || ''
})

/**
 * Processed options with selected state
 * @private
 */
const processedOptions = computed(() => {
  return props.items.map(item => ({
    ...item,
    selected: item.label === props.modelValue
  }))
})

/**
 * Toggle the dropdown expansion state
 */
const toggleDropdown = () => {
  if (!props.disabled) {
    isExpanded.value = !isExpanded.value
  }
}

/**
 * Handle input field value changes
 * @param value - The new input value
 */
const handleInputChange = (value: string) => {
  if (props.editable) {
    emit('update:modelValue', value)
  }
}

/**
 * Handle item selection from the dropdown
 * @param item - The selected item
 */
const handleItemClick = (item: { label: string; value?: string }) => {
  emit('update:modelValue', item.label)
  emit('select', item)
  isExpanded.value = false
}

/**
 * Close dropdown when clicking outside
 * @private
 */
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown')) {
    isExpanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
.dropdown {
  position: relative;
  width: fit-content;
}

.dropdown__control {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

/* Make the input field look clickable even when readonly */
.dropdown__control input {
  cursor: pointer;
}

.dropdown__menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--glim-dimension-space-tiny);
  z-index: 1000;
}

.dropdown__input--expanded .input__icon--suffix {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
</style> 