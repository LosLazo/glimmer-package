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
import Button from '../Button/Button.vue'

defineProps({
  description: {
    type: String,
    default: 'Description'
  },
  title: {
    type: String,
    default: 'Title'
  },
  variant: {
    type: String,
    default: 'default'
  },
  dismissable: {
    type: Boolean,
    default: false
  }
})

defineEmits(['dismiss'])
</script>

<style>
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