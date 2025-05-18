<template>
  <div class="tooltip" :class="[`tooltip--${position}`]" v-if="visible">
    <div class="tooltip__content body-md">
      <slot>{{ text }}</slot>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>

<script setup lang="ts">
// withDefaults is a compiler macro and doesn't need to be imported

/**
 * @component Tooltip
 * @description A tooltip component that displays additional information when hovering over or focusing on an element.
 * Tooltips can be positioned in different directions and can contain text or custom content.
 * 
 * @example <Tooltip text="This is a tooltip" position="top" :visible="visible" />
 * @example <Tooltip position="bottom" :visible="showHelp"><span>Custom tooltip content</span></Tooltip>
 * @example <Tooltip position="left" :visible="true">Help text with <strong>formatting</strong></Tooltip>
 */

/**
 * Valid tooltip positions
 * @typedef {'top'|'right'|'bottom'|'left'} TooltipPosition
 */

/**
 * Tooltip component props
 * @typedef {Object} TooltipProps
 */
interface Props {
  /**
   * Text content to display in the tooltip
   * Not required if using the default slot for content
   * @type {string}
   * @default 'Tooltip text'
   */
  text?: string
  
  /**
   * Position of the tooltip relative to its target
   * @type {TooltipPosition}
   * @default 'top'
   */
  position?: 'top' | 'right' | 'bottom' | 'left'
  
  /**
   * Whether the tooltip is visible
   * @type {boolean}
   * @default false
   */
  visible?: boolean
}

withDefaults(defineProps<Props>(), {
  text: 'Tooltip text',
  position: 'top',
  visible: false
})

/**
 * @slot default - Content of the tooltip. If not provided, the text prop will be used.
 */
</script>

<style scoped>
.tooltip {
  position: absolute;
  z-index: 100;
  max-width: 280px;
  pointer-events: none;
  width: fit-content;
}

.tooltip__content {
  background-color: var(--glim-color-elevation-background-inverse);
  color: var(--glim-color-text-strong-inverse);
  padding: var(--glim-dimension-padding-3) var(--glim-dimension-padding-4);
  border-radius: var(--glim-dimension-radius-2);
  white-space: nowrap;
}

.tooltip__arrow {
  position: absolute;
  width: 0;
  height: 0;
}

.tooltip--right {
  transform: translateY(-50%);
}

.tooltip--right .tooltip__arrow {
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  border-top: var(--glim-dimension-size-1) solid transparent;
  border-bottom: var(--glim-dimension-size-1) solid transparent;
  border-right: var(--glim-dimension-size-1) solid var(--glim-color-fg-object-solid-1000, #101010);
}

.tooltip--left {
  transform: translateY(-50%);
}

.tooltip--left .tooltip__arrow {
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  border-top: var(--glim-dimension-size-1) solid transparent;
  border-bottom: var(--glim-dimension-size-1) solid transparent;
  border-left: var(--glim-dimension-size-1) solid var(--glim-color-fg-object-solid-1000, #101010);
}

.tooltip--top {
  transform: translateX(-50%);
}

.tooltip--top .tooltip__arrow {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-left: var(--glim-dimension-size-1) solid transparent;
  border-right: var(--glim-dimension-size-1) solid transparent;
  border-top: var(--glim-dimension-size-1) solid var(--glim-color-fg-object-solid-1000, #101010);
}

.tooltip--bottom {
  transform: translateX(-50%);
}

.tooltip--bottom .tooltip__arrow {
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-left: var(--glim-dimension-size-1) solid transparent;
  border-right: var(--glim-dimension-size-1) solid transparent;
  border-bottom: var(--glim-dimension-size-1) solid var(--glim-color-fg-object-solid-1000, #101010);
}
</style> 