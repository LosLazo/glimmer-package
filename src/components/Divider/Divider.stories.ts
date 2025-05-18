import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimDivider } from '../../../src'

const meta = {
  title: 'Components/Divider',
  component: GlimDivider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { 
      control: 'select', 
      options: ['horizontal', 'vertical']
    },
    color: { 
      control: 'select', 
      options: ['strong', 'defined', 'soft', 'subtle', 'discrete', 'disabled']
    },
    margin: { control: 'text' }
  },
} as Meta<typeof GlimDivider>

export default meta
type Story = StoryObj<typeof meta>

// Default Divider
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    color: 'defined',
    margin: 'var(--glim-dimension-dimension-size-3)'
  }
}

// Horizontal Dividers with different colors
export const HorizontalColors: Story = {
  render: (args) => ({
    components: { GlimDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <div style="margin-bottom: 8px;">Strong</div>
          <Divider v-bind="args" color="strong" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Defined (Default)</div>
          <Divider v-bind="args" color="defined" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Soft</div>
          <Divider v-bind="args" color="soft" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Subtle</div>
          <Divider v-bind="args" color="subtle" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Discrete</div>
          <Divider v-bind="args" color="discrete" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Disabled</div>
          <Divider v-bind="args" color="disabled" />
        </div>
      </div>
    `
  }),
  args: {
    orientation: 'horizontal',
    margin: '8px'
  }
}

// Vertical Dividers
export const Vertical: Story = {
  render: (args) => ({
    components: { GlimDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; height: 100px; align-items: center;">
        <div>Left Content</div>
        <Divider v-bind="args" orientation="vertical" />
        <div>Right Content</div>
      </div>
    `
  }),
  args: {
    orientation: 'vertical',
    color: 'defined',
    margin: '16px'
  }
}

// Different Margins
export const CustomMargins: Story = {
  render: (args) => ({
    components: { GlimDivider },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <div style="margin-bottom: 8px;">Small Margin (8px)</div>
          <Divider v-bind="args" margin="8px" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Medium Margin (16px)</div>
          <Divider v-bind="args" margin="16px" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Large Margin (32px)</div>
          <Divider v-bind="args" margin="32px" />
        </div>
      </div>
    `
  }),
  args: {
    orientation: 'horizontal',
    color: 'defined'
  }
} 