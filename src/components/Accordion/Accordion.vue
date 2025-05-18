<template>
  <div 
    class="accordion"
    :style="accordionStyles"
  >
    <div 
      v-for="(item, index) in options" 
      :key="index"
      class="accordion-item"
      :class="{ 
        'expanded': expandedIndices.includes(index),
        'expanding': isExpanding === index,
        'collapsing': isCollapsing === index
      }"
    >
      <button 
        class="accordion-header body-md-loud"
        @click="toggleItem(index)"
        :aria-expanded="expandedIndices.includes(index)"
      >
        {{ item.label }}
        <Icon 
          name="chevron-down"
          class="accordion-icon"
          aria-hidden="true"
        />
      </button>
      <transition
        name="expand"
        @enter="startExpand(index)"
        @after-enter="endExpand"
        @leave="startCollapse(index)"
        @after-leave="endCollapse"
      >
        <div 
          v-if="expandedIndices.includes(index)"
          class="accordion-panel body-sm color-soft"
        >
          {{ item.content }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component Accordion
 * @description An expandable/collapsible accordion component that displays items with titles and expandable content.
 * Features smooth animations and customizable max-width settings.
 * 
 * @example <Accordion :options="[{label: 'Section 1', content: 'This is the content for section 1'}]" />
 * @example <Accordion :options="accordionItems" maxWidth="600px" />
 * @example <Accordion :options="faqItems" maxWidth="span 6" />
 */
import { ref, computed } from 'vue'

/**
 * Represents an accordion item with label and content
 * @typedef {Object} AccordionItem
 * @property {string} label - The label displayed in the accordion header
 * @property {string} content - The content displayed when the accordion is expanded
 */
interface AccordionItem {
  /**
   * The label displayed in the accordion header
   */
  label: string;
  
  /**
   * The content displayed when the accordion is expanded
   */
  content: string;
}

/**
 * Accordion component props
 * @typedef {Object} AccordionProps
 */
interface Props {
  /**
   * Array of accordion items to display
   * @type {AccordionItem[]}
   * @required
   */
  options?: AccordionItem[];
  
  /**
   * Maximum width of the accordion
   * Can be a CSS value (e.g. '600px'), a number (interpreted as pixels),
   * or a grid column span value (e.g. 'span 6')
   * @type {string|number}
   */
  maxWidth?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [
    {
      label: 'Getting Started',
      content: 'Welcome to our platform! This is a default accordion item that shows when no options are provided.'
    },
    {
      label: 'Features',
      content: 'Discover our amazing features and how they can help you achieve your goals.'
    },
    {
      label: 'Support',
      content: 'Need help? Our support team is here to assist you with any questions or concerns.'
    }
  ],
  maxWidth: undefined
})

/**
 * Computed styles for the accordion based on maxWidth prop
 * Handles different formats of maxWidth (pixels, grid spans, etc.)
 */
const accordionStyles = computed(() => {
  if (!props.maxWidth) return {}
  
  // If it's a number or ends with 'px', treat as pixel value
  if (typeof props.maxWidth === 'number' || props.maxWidth.endsWith('px')) {
    return { maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth }
  }
  
  // If it's a span value (e.g. 'span 6')
  if (props.maxWidth.startsWith('span')) {
    return { gridColumn: props.maxWidth }
  }
  
  return { maxWidth: props.maxWidth }
})

/**
 * Indices of currently expanded accordion items
 */
const expandedIndices = ref<number[]>([])

/**
 * Index of the item currently being expanded (for animation)
 */
const isExpanding = ref<number | null>(null)

/**
 * Index of the item currently being collapsed (for animation)
 */
const isCollapsing = ref<number | null>(null)

/**
 * Start the expand animation for an accordion item
 * @param {number} index - Index of the item being expanded
 */
const startExpand = (index: number) => {
  isExpanding.value = index
}

/**
 * End the expand animation
 */
const endExpand = () => {
  isExpanding.value = null
}

/**
 * Start the collapse animation for an accordion item
 * @param {number} index - Index of the item being collapsed
 */
const startCollapse = (index: number) => {
  isCollapsing.value = index
}

/**
 * End the collapse animation
 */
const endCollapse = () => {
  isCollapsing.value = null
}

/**
 * Toggle expansion state of an accordion item
 * @param {number} index - Index of the item to toggle
 */
const toggleItem = (index: number) => {
  if (expandedIndices.value.includes(index)) {
    // Remove the index if it's already expanded
    expandedIndices.value = expandedIndices.value.filter(i => i !== index)
  } else {
    // Add the index if it's not expanded
    expandedIndices.value = [...expandedIndices.value, index]
  }
}
</script>

<style scoped>
.accordion {
  width: 100%;
  display: block;
}

.accordion-item {
  margin-bottom: var(--glim-dimension-dimensions-unit-2);
  border-radius: var(--glim-dimension-radius-3);
  background: var(--glim-color-elevation-base);
  overflow: hidden;
}

.accordion-item.expanded,
.accordion-item.expanding,
.accordion-item.collapsing {
  background: var(--glim-color-interaction-expanded);
  align-items: start;
  text-align: left;
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--glim-dimension-dimensions-unit-3);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--glim-color-text-strong);
  text-align: left;
  border-radius: var(--glim-dimension-radius-3);
  transition: background-color 0.2s ease;
}

/* Only apply hover effect when not expanded, expanding, or collapsing */
.accordion-item:not(.expanded):not(.expanding):not(.collapsing) .accordion-header:hover {
  background: var(--glim-color-interaction-hover);
}

.accordion-panel {
  background: transparent;
  margin-top: -1px;
  padding: 0 var(--glim-dimension-dimensions-unit-4) var(--glim-dimension-dimensions-unit-4);
  color: var(--glim-color-text-soft);
  max-height: 1000px;
  height: auto;
}

.accordion-icon {
  width: var(--glim-dimension-dimensions-unit-5);
  height: var(--glim-dimension-dimensions-unit-5);
  color: var(--glim-color-text-soft);
  transition: transform 0.3s ease;
}

.expanded .accordion-icon {
  transform: rotate(-180deg);
}

/* Animation classes */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  height: auto;
  opacity: 1;
}
</style> 