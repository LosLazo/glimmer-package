import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimBadge } from '../../../src'

const meta = {
  title: 'Components/Badge',
  component: GlimBadge,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    max: { control: 'number' },
    isDot: { control: 'boolean' }
  },
} satisfies Meta<typeof GlimBadge>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  args: {
    value: 0,
    max: 99,
    isDot: false
  }
}

// Dot Variant Story
export const Dot: Story = {
  args: {
    isDot: true
  }
}

// Number Variants Story
export const Numbers: Story = {
  render: (args) => ({
    components: { GlimBadge },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <GlimBadge v-bind="args" value="1" />
        <GlimBadge v-bind="args" value="5" />
        <GlimBadge v-bind="args" value="99" />
        <GlimBadge v-bind="args" value="100" />
      </div>
    `
  })
}

// Text Variants Story
export const Text: Story = {
  render: (args) => ({
    components: { GlimBadge },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <GlimBadge v-bind="args" value="NEW" />
        <GlimBadge v-bind="args" value="HOT" />
        <GlimBadge v-bind="args" value="SALE" />
      </div>
    `
  })
}

// With Custom Max Story
export const WithCustomMax: Story = {
  render: (args) => ({
    components: { GlimBadge },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <GlimBadge v-bind="args" value="50" max="50" />
        <GlimBadge v-bind="args" value="51" max="50" />
        <GlimBadge v-bind="args" value="100" max="50" />
      </div>
    `
  })
} 