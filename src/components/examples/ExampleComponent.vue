<template>
  <div class="example-component" :class="{ 'is-active': isActive }">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button @click="handleClick">{{ buttonText }}</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * @component ExampleComponent
 * @description A demonstration component showing how to properly document Vue components.
 * This component serves as a reference for the documentation format.
 * 
 * @example
 * <ExampleComponent 
 *   title="Basic Example"
 *   description="A simple example of the component"
 * />
 * 
 * @example
 * <ExampleComponent 
 *   title="Active State"
 *   description="Component in active state"
 *   :isActive="true"
 *   buttonText="Deactivate"
 * />
 */

/**
 * Component props interface
 */
interface Props {
  /**
   * The main title of the component
   * @default "Default Title"
   */
  title?: string;

  /**
   * Descriptive text to display below the title
   */
  description: string;

  /**
   * Whether the component is in an active state
   * @default false
   */
  isActive?: boolean;

  /**
   * Text to display on the button
   * @default "Click Me"
   */
  buttonText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Default Title',
  isActive: false,
  buttonText: 'Click Me'
});

/**
 * Component events interface
 */
const emit = defineEmits<{
  /**
   * Emitted when the button is clicked
   * @param {boolean} isActive - The new active state
   */
  'update:isActive': [isActive: boolean];
  
  /**
   * Emitted when the button is clicked with additional data
   * @param {string} action - The action that was performed
   * @param {Object} data - Additional data about the click
   */
  'click': [action: string, data: { timestamp: number }];
}>();

/**
 * Handles the button click event
 * @returns {void} Nothing
 */
function handleClick(): void {
  const newState = !props.isActive;
  emit('update:isActive', newState);
  emit('click', 'toggle', { timestamp: Date.now() });
}

/**
 * Computed property that returns a formatted title
 * @returns {string} The formatted title
 */
const formattedTitle = computed(() => {
  return props.title.toUpperCase();
});
</script>

<style scoped>
.example-component {
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background);
}

.example-component.is-active {
  border-color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.example-component h2 {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}
</style> 