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
import Input from '../GlimInput/GlimInput.vue'
import Menu from '../GlimMenu/GlimMenu.vue'

/**
 * GlimDropdown provides a dropdown selection interface with optional editable input field
 *
 * @displayName GlimDropdown
 * @status stable
 * @group Form Controls
 *
 * @example Basic Usage
 * ```vue
 * <GlimDropdown
 *   id="dropdown1"
 *   v-model="selectedOption"
 *   :items="[{label: 'Option 1'}, {label: 'Option 2'}]"
 *   label="Select an option"
 * />
 * ```
 *
 * @example Editable Dropdown
 * ```vue
 * <GlimDropdown
 *   id="editableDropdown"
 *   v-model="selectedOption"
 *   :items="dropdownOptions"
 *   label="Select or type"
 *   :editable="true"
 * />
 * ```
 */

export interface DropdownItem {
  label: string
  value?: string
  selected?: boolean
}

export interface GlimDropdownProps {
  /**
   * Current value of the dropdown
   */
  modelValue: string
  
  /**
   * Label text for the dropdown field
   */
  label?: string
  
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string
  
  /**
   * Size of the dropdown component
   */
  size?: 'large' | 'medium' | 'small'
  
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean
  
  /**
   * Error message to display
   */
  error?: string
  
  /**
   * Success message to display
   */
  success?: string
  
  /**
   * Icon to display before the input text
   */
  prefixIcon?: string
  
  /**
   * Unique identifier for the dropdown field
   */
  id: string
  
  /**
   * Array of options to display in the dropdown menu
   */
  items: Array<DropdownItem>
  
  /**
   * Whether the input text can be edited manually
   */
  editable?: boolean
}

const props = withDefaults(defineProps<GlimDropdownProps>(), {
  label: 'Label',
  placeholder: 'Placeholder',
  size: 'medium',
  disabled: false,
  error: '',
  success: '',
  prefixIcon: '',
  editable: false
})

export interface GlimDropdownEmits {
  /**
   * Emitted when the dropdown value changes
   * @param value - The new dropdown value
   */
  (e: 'update:modelValue', value: string): void
  
  /**
   * Emitted when an option is selected from the dropdown
   * @param item - The selected item object
   */
  (e: 'select', item: DropdownItem): void
}

const emit = defineEmits<GlimDropdownEmits>()

// State management
const isExpanded = ref(false)

// Computed properties
const displayValue = computed(() => {
  return props.modelValue || props.placeholder || ''
})

const processedOptions = computed(() => {
  return props.items.map(item => ({
    ...item,
    selected: item.label === props.modelValue
  }))
})

// Event handlers
const toggleDropdown = () => {
  if (!props.disabled) {
    isExpanded.value = !isExpanded.value
  }
}

const handleInputChange = (value: string) => {
  if (props.editable) {
    emit('update:modelValue', value)
  }
}

const handleItemClick = (item: DropdownItem) => {
  emit('update:modelValue', item.label)
  emit('select', item)
  isExpanded.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown')) {
    isExpanded.value = false
  }
}

// Lifecycle hooks
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