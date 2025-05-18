import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { GlimSegmentedControls } from '../../../src'

const meta = {
  title: 'Components/SegmentedControls',
  component: GlimSegmentedControls,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    items: { control: 'object' },
    size: { 
      control: 'select', 
      options: ['small', 'default']
    }
  },
} as Meta<typeof GlimSegmentedControls>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  args: {
    modelValue: 'day',
    items: [
      { id: 'day', label: 'Day' },
      { id: 'week', label: 'Week' },
      { id: 'month', label: 'Month' }
    ],
    size: 'default'
  },
  render: (args) => ({
    components: { GlimSegmentedControls },
    setup() {
      const selected = ref(args.modelValue)
      return { 
        args,
        selected
      }
    },
    template: `
      <div>
        <GlimSegmentedControls
          v-model="selected"
          :items="args.items"
          :size="args.size"
        />
        <div style="margin-top: 16px;">Selected: {{ selected }}</div>
      </div>
    `
  })
}

// With Disabled Item
export const WithDisabledItem: Story = {
  args: {
    modelValue: 'day',
    items: [
      { id: 'day', label: 'Day' },
      { id: 'week', label: 'Week' },
      { id: 'month', label: 'Month', disabled: true }
    ],
    size: 'default'
  },
  render: (args) => ({
    components: { GlimSegmentedControls },
    setup() {
      const selected = ref(args.modelValue)
      return { 
        args,
        selected
      }
    },
    template: `
      <div>
        <GlimSegmentedControls
          v-model="selected"
          :items="args.items"
          :size="args.size"
        />
        <div style="margin-top: 16px;">Selected: {{ selected }}</div>
      </div>
    `
  })
}

// Size Variants
export const Sizes: Story = {
  args: {
    modelValue: 'list',
    items: [
      { id: 'list', label: 'List' },
      { id: 'grid', label: 'Grid' },
      { id: 'table', label: 'Table' }
    ]
  },
  render: (args) => ({
    components: { GlimSegmentedControls },
    setup() {
      const defaultSelected = ref(args.modelValue)
      const smallSelected = ref(args.modelValue)
      
      return { 
        args,
        defaultSelected,
        smallSelected
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 8px;">Default Size:</div>
          <GlimSegmentedControls
            v-model="defaultSelected"
            :items="args.items"
            size="default"
          />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Small Size:</div>
          <GlimSegmentedControls
            v-model="smallSelected"
            :items="args.items"
            size="small"
          />
        </div>
      </div>
    `
  })
}

// In Context
export const InContext: Story = {
  args: {
    modelValue: 'week',
    items: [
      { id: 'day', label: 'Day' },
      { id: 'week', label: 'Week' },
      { id: 'month', label: 'Month' }
    ],
    size: 'default'
  },
  render: () => ({
    components: { GlimSegmentedControls },
    setup() {
      const viewMode = ref('week')
      const sortOrder = ref('newest')
      
      return { 
        viewMode,
        sortOrder
      }
    },
    template: `
      <div style="max-width: 600px; padding: 24px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h3 style="margin-top: 0; margin-bottom: 24px; font-size: 18px;">Calendar Settings</h3>
        
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <div style="font-weight: 500; margin-bottom: 8px;">View Mode</div>
            <GlimSegmentedControls
              v-model="viewMode"
              :items="[
                { id: 'day', label: 'Day' },
                { id: 'week', label: 'Week' },
                { id: 'month', label: 'Month' }
              ]"
            />
          </div>
          
          <div>
            <div style="font-weight: 500; margin-bottom: 8px;">Sort Events</div>
            <GlimSegmentedControls
              v-model="sortOrder"
              :items="[
                { id: 'newest', label: 'Newest' },
                { id: 'oldest', label: 'Oldest' },
                { id: 'priority', label: 'Priority' }
              ]"
              size="small"
            />
          </div>
        </div>
      </div>
    `
  })
} 