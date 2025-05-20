import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimSpinner } from '../../../src'

const meta = {
  title: 'Components/GlimSpinner',
  component: GlimSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: { 
      control: 'select', 
      options: ['small', 'medium', 'large']
    },
    color: { control: 'color' }
  },
} as Meta<typeof GlimSpinner>

export default meta
type Story = StoryObj<typeof meta>

// Default Spinner
export const Default: Story = {
  args: {
    size: 'medium',
    color: 'var(--glim-content-primary)'
  }
}

// Sizes
export const Sizes: Story = {
  render: (args) => ({
    components: { GlimSpinner },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 32px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimSpinner v-bind="args" size="small" />
          <span>Small</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimSpinner v-bind="args" size="medium" />
          <span>Medium</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimSpinner v-bind="args" size="large" />
          <span>Large</span>
        </div>
      </div>
    `
  }),
  args: {
    color: 'var(--glim-content-primary)'
  }
}

// Colors
export const Colors: Story = {
  render: (args) => ({
    components: { GlimSpinner },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 32px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimSpinner v-bind="args" color="var(--glim-content-primary)" />
          <span>Primary</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimSpinner v-bind="args" color="#ff0000" />
          <span>Red</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimSpinner v-bind="args" color="#00ff00" />
          <span>Green</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimSpinner v-bind="args" color="#0000ff" />
          <span>Blue</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimSpinner v-bind="args" color="#ff00ff" />
          <span>Magenta</span>
        </div>
      </div>
    `
  }),
  args: {
    size: 'medium'
  }
}

// In Context
export const InContext: Story = {
  render: (args) => ({
    components: { GlimSpinner },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 8px; padding: 16px; background-color: #f5f5f5; border-radius: 8px;">
          <GlimSpinner v-bind="args" size="small" />
          <span>Loading results...</span>
        </div>
        
        <div style="display: flex; justify-content: center; padding: 32px; background-color: #f5f5f5; border-radius: 8px;">
          <GlimSpinner v-bind="args" size="large" />
        </div>
        
        <button style="display: flex; align-items: center; gap: 8px; background-color: #2196F3; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          <GlimSpinner v-bind="args" size="small" color="white" />
          <span>Loading</span>
        </button>
      </div>
    `
  }),
  args: {}
} 