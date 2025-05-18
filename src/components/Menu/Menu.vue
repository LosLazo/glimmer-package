<template>
  <div class="menu">
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
import { ref } from 'vue'
import Icon from '../Icon/Icon.vue'

interface MenuItem {
  label: string;
  selected?: boolean;
}

const props = defineProps({
  items: {
    type: Array as () => MenuItem[],
    required: true,
    default: () => [
      { label: 'Option 1', selected: false },
      { label: 'Option 2', selected: false },
      { label: 'Option 3', selected: false }
    ]
  }
})

defineEmits<{
  (e: 'click', item: MenuItem): void
}>()

const selectedVersion = ref('')

const handleVersionSelect = (item: MenuItem) => {
  selectedVersion.value = item.label
}
</script>

<style>
.menu {
  background-color: var(--glim-color-elevation-background-inverse);
  border-radius: var(--glim-dimension-dimensions-unit-8);
  overflow: auto;
  color: var(--glim-color-text-soft-inverse);
  display: flex;
  flex-direction: column;
  gap: var(--glim-dimension-padding-1);
  padding: var(--glim-dimension-padding-2);
  min-width: 200px;
  max-height: 300px;
  z-index: 1000;
  border-radius: var(--glim-dimension-radius-3);
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