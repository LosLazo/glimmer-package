<template>
  <span 
    class="icon" 
    v-html="svgContent"
    :style="{ 
      width: size + 'px', 
      height: size + 'px',
      color: colorValue
    }"
  ></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import feather from 'feather-icons'

/**
 * @component Icon
 * @description Renders SVG icons from the Feather icon library with customizable size and color.
 * This component provides a simple way to include consistent icons throughout the application.
 * 
 * @example <Icon name="user" />
 * @example <Icon name="heart" size="16" color="red" />
 * @example <Icon name="star" size="32" />
 * @see {@link https://feathericons.com/|Feather Icons} for available icon names
 */

/**
 * Icon component props
 * @typedef {Object} IconProps
 */
interface Props {
  /**
   * Name of the icon from Feather icon set
   * @type {string}
   * @required
   * @see {@link https://feathericons.com/|Available Icons}
   */
  name: string
  
  /**
   * Size of the icon in pixels
   * @type {number}
   * @default 24
   */
  size?: number
  
  /**
   * Color variant of the icon
   * @type {'currentColor' | 'strong' | 'defined' | 'soft' | 'disabled' | 'discrete'}
   * @default 'currentColor'
   */
  color?: 'currentColor' | 'strong' | 'defined' | 'soft' | 'disabled' | 'discrete'
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor'
})

/**
 * Computed color value based on the color variant
 * @returns {string} CSS color value
 */
const colorValue = computed(() => {
  switch (props.color) {
    case 'strong':
      return 'var(--glim-color-text-strong)'
    case 'defined':
      return 'var(--glim-color-text-defined)'
    case 'soft':
      return 'var(--glim-color-text-soft)'
    case 'disabled':
      return 'var(--glim-color-text-disabled)'
    case 'discrete':
      return 'var(--glim-color-text-discrete)'
    default:
      return 'currentColor'
  }
})

/**
 * Computed SVG content based on the icon name
 * @returns {string} Raw SVG HTML string or empty string if icon not found
 */
const svgContent = computed(() => {
  if (!props.name || !(props.name in feather.icons)) {
    console.warn(`Icon with name "${props.name}" not found`)
    return ''
  }
  
  return feather.icons[props.name as keyof typeof feather.icons].toSvg({
    width: props.size,
    height: props.size,
    color: colorValue.value
  })
})
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style> 