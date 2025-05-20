<template>
  <div 
    class="example-component"
    :class="{ 'is-active': isActive }"
    @click="handleClick"
  >
    <h2>{{ title }}</h2>
    <div class="content">
      <p>Count: {{ count }}</p>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { exampleComponentAPI } from './component-template';

export default defineComponent({
  name: 'ExampleComponent',
  
  props: {
    title: {
      type: String,
      required: true,
      default: 'Default Title'
    },
    count: {
      type: Number,
      required: false,
      default: 0,
      validator: (value: number) => [0, 1, 2, 3, 4, 5].includes(value)
    }
  },

  emits: {
    click: (event: MouseEvent) => true
  },

  setup(props, { emit }) {
    // Computed property
    const isActive = computed(() => {
      return props.count > 0;
    });

    // Methods
    const reset = () => {
      // Reset logic here
    };

    const getValue = () => {
      return props.title;
    };

    const handleClick = (event: MouseEvent) => {
      emit('click', event);
    };

    return {
      isActive,
      reset,
      getValue,
      handleClick
    };
  }
});
</script>

<style scoped>

</style>

<!-- Component API Documentation -->
<script lang="ts">
// This section documents the component's API
// It uses the structure defined in component-template.ts
export const componentAPI = exampleComponentAPI;
</script> 