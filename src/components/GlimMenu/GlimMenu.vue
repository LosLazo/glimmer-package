<template>
  <div class="menu" data-glimmer-component="GlimMenu">
    <div 
      v-for="(item, index) in items" 
      :key="index" 
      class="menu__item"
      :class="{ 'menu__item--selected': item.selected }"
      @click="$emit('click', item)"
    >
      <div class="menu__item-content">
        <span class="menu__item-label body-sm">{{ item.label }}</span>
        <Icon v-if="item.selected" name="check" :size="16" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../GlimIcon/GlimIcon.vue'

/**
 * @component GlimMenu
 * @description A menu component that displays a list of selectable items.
 * Used for dropdown menus, context menus, and other selection interfaces.
 * 
 * @example <GlimMenu :items="[{label: 'Option 1'}, {label: 'Option 2', selected: true}]" @click="handleItemClick" />
 * @example <GlimMenu :items="menuOptions" @click="(item) => selectedItem = item" />
 */

/**
 * Menu item interface defining the structure of menu items
 */
export interface MenuItem {
  /** Display text for the menu item */
  label: string;
  /** Whether the item is currently selected */
  selected?: boolean;
}

/**
 * Menu component props
 */
defineProps<{
  /** Array of menu items to display */
  items: MenuItem[];
}>();

/**
 * Menu component events
 */
defineEmits<{
  /** Emitted when a menu item is clicked, with the selected item as payload */
  (e: 'click', item: MenuItem): void;
}>();
</script>

<style>
.menu {
  background-color: var(--glim-color-elevation-background-inverse);
  border-radius: var(--glim-dimension-radius-3);
  overflow: auto;
  color: var(--glim-color-text-soft-inverse);
  display: flex;
  flex-direction: column;
  gap: var(--glim-dimension-padding-1);
  padding: var(--glim-dimension-padding-2);
  min-width: 200px;
  max-height: 300px;
  z-index: 1000;
}

.menu__item {
  border-radius: var(--glim-dimension-radius-2);
  overflow: hidden;
  min-height: var(--glim-dimension-dimensions-unit-6);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  gap: var(--glim-dimension-dimensions-unit-16);
  height: var(--glim-dimension-dimensions-unit-6);
}

.menu__item:hover {
  color: var(--glim-color-text-strong-inverse);
  background-color: var(--glim-color-interaction-hover-inverse);
}

.menu__item--selected {
  background-color: var(--glim-color-solid-700);
  color: var(--glim-color-text-strong-inverse);
}
</style> 