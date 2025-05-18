<template>
  <div 
    class="card"
    :class="{ 'card--link': href }"
    :style="cardStyle"
  >
    <Image
      v-if="imageSrc"
      :src="imageSrc"
      :alt="imageAlt || ''"
      :aspect-ratio="imageAspectRatio"
      :orientation="imageOrientation"
      class="card__image"
    />
    <div class="card__content">
      <div class="card__header">
        <p v-if="title" class="body-sm color-strong">{{ title }}</p>
      </div>
      <p v-if="text" class="body-sm color-soft">{{ text }}</p>
      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <!-- <Icon 
      v-if="href"
      name="arrow-right"
      :size="24"
      class="card__link-icon"
    /> -->
  </div>
</template>

<script setup lang="ts">
import Image from '../Image/Image.vue'
import Icon from '../Icon/Icon.vue'
import { computed } from 'vue'

/**
 * @component Card
 * @description A versatile card component for displaying content with optional image and action slots.
 * Cards can be used for various purposes such as product cards, article previews, or feature highlights.
 * 
 * @example <Card title="Card Title" text="Card description text" />
 * @example <Card 
 *   title="Product Name" 
 *   text="Product description" 
 *   imageSrc="/images/product.jpg" 
 * />
 * @example <Card title="Spanning Card" width="span 2">
 *   <template #actions>
 *     <Button>Action</Button>
 *   </template>
 * </Card>
 */

/**
 * Valid values for width prop
 * @typedef {number|`${number}`|`span ${number}`|'auto'} WidthValue
 */
type WidthValue = number | `${number}` | `span ${number}` | 'auto'

/**
 * Card component props
 * @typedef {Object} CardProps
 */
interface Props {
  
  /**
   * Main title of the card
   * @type {string}
   */
  title?: string
  
  /**
   * Description or content text
   * @type {string}
   */
  text?: string
  
  /**
   * URL or path to the card's image
   * @type {string}
   */
  imageSrc?: string
  
  /**
   * Alt text for the image (for accessibility)
   * @type {string}
   */
  imageAlt?: string
  
  /**
   * Aspect ratio of the image
   * @type {'1x1'|'16x9'|'4x3'|'4x5'|'3x2'|'5x4'}
   */
  imageAspectRatio?: '1x1' | '16x9' | '4x3' | '4x5' | '3x2' | '5x4'
  
  /**
   * Orientation of the image
   * @type {'landscape'|'portrait'}
   */
  imageOrientation?: 'landscape' | 'portrait'
  
  /**
   * URL when the card is clickable
   * @type {string}
   */
  href?: string
  
  /**
   * Width of the card - can be pixels, a CSS value, or a grid span
   * @type {WidthValue}
   */
  width?: WidthValue
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Title',
  text: 'Text',
  imageSrc: 'https://cdn.cosmos.so/962784fe-d06b-4f23-84e5-f0a1efd3a6d6.?format=jpeg',
  imageAlt: 'Image Alt',
  imageAspectRatio: '4x3',
  imageOrientation: 'landscape',
  href: '',
  width: 'auto'
})

/**
 * Computed CSS styles for the card based on the width prop
 * @returns {Object} CSS style object
 */
const cardStyle = computed(() => {
  if (!props.width) return {}
  
  if (typeof props.width === 'number' || !props.width.startsWith('span')) {
    return { width: typeof props.width === 'number' ? `${props.width}px` : props.width }
  }
  
  return { gridColumn: props.width }
})

/**
 * @slot actions - Slot for action buttons or links at the bottom of the card
 */
</script>

<style lang="css" scoped>
.card {
  position: relative;
  border-radius: var(--glim-dimension-radius-2);
}

.card--link {
  cursor: pointer;
}

.card--link:hover {
  text-decoration: underline;
}

.card__image {
  width: 100%;
  transition: all .4s ease;
  min-width: 200px;
}

.card__header {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--glim-dimension-space-tiny);
}

.card__header * {
  margin: 0;
}

.card__content {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: var(--glim-dimension-padding-2) var(--glim-dimension-padding-6) var(--glim-dimension-padding-2) 0px;
    text-align: left;
}

.card__actions {
  display: flex;
  gap: var(--glim-dimension-space-small);
  margin-top: var(--glim-dimension-space-small);
}

.card__link-icon {
  position: absolute;
  bottom: var(--glim-dimension-space-medium);
  right: var(--glim-dimension-space-medium);
  color: var(--glim-color-text-strong);
}
</style> 