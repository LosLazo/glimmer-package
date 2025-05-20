<template>
  <div class="banner" :class="[
    { 'banner--dismissible': dismissable },
    `banner--${variant || 'default'}`
  ]">
    <div class="banner__content body-sm">
      {{ description || title }}
      <Button v-if="dismissable" variant="ghost" size="small" suffixIcon="x" @click="$emit('dismiss')" inverse />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../GlimButton/GlimButton.vue'

/**
 * @component GlimBanner
 * @description A banner component that displays information or notifications with different variants.
 * Can be dismissible and supports both a title and description.
 * 
 * @example <GlimBanner title="Notice" />
 * @example <GlimBanner description="Important information" variant="info" />
 * @example <GlimBanner title="Dismissable Banner" dismissable />
 */

defineProps({
  /**
   * Description text of the banner
   * @type {string}
   * @default 'Description'
   */
  description: {
    type: String,
    default: 'Description'
  },
  
  /**
   * Title text of the banner
   * @type {string}
   * @default 'Title'
   */
  title: {
    type: String,
    default: 'Title'
  },
  
  /**
   * Visual style variant of the banner
   * @type {'default'|'info'}
   * @default 'default'
   */
  variant: {
    type: String as () => 'default' | 'info',
    default: 'default',
    validator: (value: string) => ['default', 'info'].includes(value)
  },
  
  /**
   * Whether the banner can be dismissed
   * @type {boolean}
   * @default false
   */
  dismissable: {
    type: Boolean,
    default: false
  }
})

/**
 * Define emitted events
 */
defineEmits<{
  /**
   * Emitted when the dismiss button is clicked
   */
  'dismiss': []
}>()
</script>

<style lang="css" scoped>
.banner {
  width: 100%;
  background-color: var(--glim-color-elevation-background-inverse);
  padding: var(--glim-dimension-padding-3) var(--glim-dimension-padding-4);
  color: var(--glim-color-text-strong-inverse);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.banner--info {
  color: var(--glim-color-text-strong-inverse);
}

.banner__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 