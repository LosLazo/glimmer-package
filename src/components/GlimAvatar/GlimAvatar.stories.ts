import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimAvatar } from '../../../src'

const meta = {
  title: 'Components/GlimAvatar',
  component: GlimAvatar,
  tags: ['autodocs'],
  argTypes: {
    image: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'number' },
    shape: { 
      control: 'select', 
      options: ['circle', 'squircle']
    }
  },
} satisfies Meta<typeof GlimAvatar>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  args: {
    image: 'https://cdn.cosmos.so/962784fe-d06b-4f23-84e5-f0a1efd3a6d6.?format=jpeg',
    alt: 'User avatar',
    size: 40,
    shape: 'circle'
  }
}

// With Image Story
export const WithImage: Story = {
  args: {
    image: 'https://i.pravatar.cc/300',
    alt: 'User avatar',
    size: 40,
    shape: 'circle'
  }
}

// Size Variants Story
export const Sizes: Story = {
  render: (args) => ({
    components: { GlimAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <GlimAvatar v-bind="args" size="24" />
        <GlimAvatar v-bind="args" size="40" />
        <GlimAvatar v-bind="args" size="64" />
        <GlimAvatar v-bind="args" size="96" />
      </div>
    `
  })
}

// Shape Variants Story
export const Shapes: Story = {
  render: (args) => ({
    components: { GlimAvatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <GlimAvatar v-bind="args" shape="circle" />
        <GlimAvatar v-bind="args" shape="squircle" />
      </div>
    `
  })
} 