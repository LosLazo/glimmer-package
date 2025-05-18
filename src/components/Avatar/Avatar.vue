<template>
  <div 
    class="avatar" 
    :class="{ 
      'avatar--fallback': !image,
      'avatar--squircle': shape === 'squircle',
      'avatar--circle': shape === 'circle'
    }"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <img v-if="image" :src="image" :alt="alt" class="avatar__image">
    <div v-else class="avatar__fallback">
      <Icon name="user" :size="Math.floor(size * 0.6)" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component Avatar
 * @description A versatile avatar component for displaying user images with fallback icon support.
 * Supports different shapes (circle or squircle) and customizable sizing.
 * 
 * @example <Avatar />
 * @example <Avatar image="/path/to/image.jpg" alt="User Name" />
 * @example <Avatar shape="squircle" size={64} />
 */
import Icon from '../Icon/Icon.vue'

/**
 * Avatar component props
 * @typedef {Object} AvatarProps
 */
defineProps({
  /**
   * Image source URL for the avatar
   * When not provided, falls back to a user icon
   * @type {string}
   * @default 'https://cdn.cosmos.so/962784fe-d06b-4f23-84e5-f0a1efd3a6d6.?format=jpeg'
   */
  image: {
    type: String,
    default: 'https://cdn.cosmos.so/962784fe-d06b-4f23-84e5-f0a1efd3a6d6.?format=jpeg'
  },
  
  /**
   * Alternative text for the avatar image (for accessibility)
   * @type {string}
   * @default 'User avatar'
   */
  alt: {
    type: String,
    default: 'User avatar'
  },
  
  /**
   * Size of the avatar in pixels (applied to both width and height)
   * @type {number}
   * @default 40
   */
  size: {
    type: Number,
    default: 40
  },
  
  /**
   * Shape of the avatar
   * @type {'circle'|'squircle'}
   * @default 'circle'
   */
  shape: {
    type: String as () => 'circle' | 'squircle',
    default: 'circle',
    validator: (value: string) => ['circle', 'squircle'].includes(value)
  }
})
</script>

<style>
.avatar {
  overflow: hidden;
  background-color: var(--glim-color-color-solid-100);
}

.avatar--circle {
  border-radius: 50%;
}

.avatar--squircle {
  border-radius: 8px;
}

.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar__fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--glim-content-secondary);
}
</style> 