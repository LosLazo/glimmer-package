<template>
  <div class="message" :class="`message--${variant}`">
    <div class="message__icon">
      <Icon :name="getIconFromVariant" />
    </div>
    <div class="message__content">
      <h3 class="message__header body-md color-inverse-strong">{{ title }}</h3>
      <p class="message__body body-sm color-inverse-soft">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../GlimIcon/GlimIcon.vue'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true, 
    default: 'Title'
  },
  description: {
    type: String,
    required: true,
    default: 'Description'
  },
  variant: {
    type: String,
    default: 'info',
    validator: (value: string) => ['info', 'success', 'warning', 'error'].includes(value)
  }
})

const getIconFromVariant = computed(() => {
  switch (props.variant) {
    case 'success': 
      return 'check-circle'
    case 'warning':
      return 'alert-triangle'
    case 'error':
      return 'alert-circle'
    case 'info':
    default:
      return 'info'
  }
})
</script>

<style>
.message {
  display: flex;
  gap: var(--glim-dimension-gap-2);
  min-width: 200px;
  padding: var(--glim-dimension-padding-5);
  background-color: var(--glim-color-elevation-background-inverse);
  border-radius: var(--glim-dimension-radius-3);
  color: var(--glim-color-text-strong-inverse);
  overflow: hidden;
}

.message--info {
  background-color: var(--glim-color-system-info-strong);
}

.message--success {
  background-color: var(--glim-color-system-success-strong);
}

.message--warning {
  background-color: var(--glim-color-system-warning-strong);
}

.message--error {
  background-color: var(--glim-color-system-error-strong);
}

.message__icon {
  flex-shrink: 0;
}

.message__content {
  display: flex;
  flex-direction: column;
  gap: var(--glim-dimension-gap-1);
}

.message__header {
  margin: 0;
  margin-bottom: var(--glim-dimension-space-xxsmall);
  color: var(--glim-color-text-strong-inverse);
}

.message__body {
  margin: 0;
  color: var(--glim-color-text-soft-inverse);
}
</style> 