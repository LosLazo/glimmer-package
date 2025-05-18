<template>
  <div 
    class="divider" 
    :class="[
      `divider--${orientation}`,
      `divider--color-${color}`
    ]"
    :style="marginStyle"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * @component Divider
 * @description A versatile divider component for visual separation of content.
 * Supports both horizontal and vertical orientations with various color strengths.
 * @example
 * <Divider />
 * <Divider orientation="vertical" color="strong" margin="16" />
 */

interface Props {
  /**
   * The orientation of the divider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * The color strength of the divider
   * @default 'defined'
   */
  color?: 'strong' | 'defined' | 'soft' | 'subtle' | 'discrete' | 'disabled';
  
  /**
   * Margin around the divider in pixels or CSS value
   * @default 'var(--glim-dimension-space-medium)'
   */
  margin?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  color: 'defined',
  margin: 'var(--glim-dimension-space-medium)'
});

const marginStyle = computed(() => {
  const margin = typeof props.margin === 'number' 
    ? `${props.margin}px` 
    : props.margin;
  
  if (props.orientation === 'horizontal') {
    return {
      marginTop: margin,
      marginBottom: margin
    };
  } else {
    return {
      marginLeft: margin,
      marginRight: margin
    };
  }
});
</script>

<style scoped>
.divider {
  color: var(--glim-color-border-defined);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid;
}

/* Orientation styles */
.divider--horizontal {
  width: 100%;
  height: 1px;
  background-color: var(--glim-divider-color);
}

.divider--vertical {
  width: 1px;
  height: 100%;
  background-color: var(--glim-divider-color);
}

/* Color variants */
.divider--color-strong {
  color: var(--glim-color-border-strong);
}

.divider--color-defined {
  color: var(--glim-color-border-defined);
}

.divider--color-soft {
  color: var(--glim-color-border-soft);
}

.divider--color-subtle {
  color: var(--glim-color-border-subtle);
}

.divider--color-discrete {
  color: var(--glim-color-border-discrete, rgba(0, 0, 0, 0.05));
}

.divider--color-disabled {
  color: var(--glim-color-border-disabled);
}
</style> 