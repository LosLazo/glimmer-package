import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimButton } from '../../../src'

const meta = {
  title: 'Components/Button',
  component: GlimButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'tertiary', 'danger']
    },
    size: { 
      control: 'select', 
      options: ['large', 'medium', 'small', 'tiny']
    },
    loading: {
      control: 'boolean'
    },
    disabled: { control: 'boolean' },
    inverse: { control: 'boolean' },
    prefixIcon: { control: 'text' },
    suffixIcon: { control: 'text' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset']
    },
    name: { control: 'text' },
    onClick: { action: 'clicked' }
  },
} satisfies Meta<typeof GlimButton>

export default meta
type Story = StoryObj<typeof meta>

// Default Button with default props
export const Default: Story = {
  args: {
    disabled: false,
    prefixIcon: 'home',
    suffixIcon: 'home',
    size: 'medium',
    loading: false,
    variant: 'primary',
    inverse: false,
    type: 'button',
    name: ''
  }
}

// Variant Stories
export const Variants: Story = {
  args: {
    size: 'large',
  },
  render: (args) => ({
    components: { GlimButton },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <GlimButton v-bind="args" variant="primary">Primary</GlimButton>
        <GlimButton v-bind="args" variant="secondary">Secondary</GlimButton>
        <GlimButton v-bind="args" variant="tertiary">Tertiary</GlimButton>
        <GlimButton v-bind="args" variant="danger">Danger</GlimButton>
      </div>
    `
  })
}

// Size Stories
export const Sizes: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { GlimButton },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <GlimButton v-bind="args" size="large">Large</GlimButton>
        <GlimButton v-bind="args" size="medium">Medium</GlimButton>
        <GlimButton v-bind="args" size="small">Small</GlimButton>
        <GlimButton v-bind="args" size="tiny">Tiny</GlimButton>
      </div>
    `
  })
}

// Loading State Story
export const LoadingState: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
  render: (args) => ({
    components: { GlimButton },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <GlimButton v-bind="args" :loading="false">Default</GlimButton>
        <GlimButton v-bind="args" :loading="true">Loading</GlimButton>
        <GlimButton v-bind="args" variant="secondary" :loading="true">Loading</GlimButton>
        <GlimButton v-bind="args" variant="tertiary" :loading="true">Loading</GlimButton>
        <GlimButton v-bind="args" variant="danger" :loading="true">Loading</GlimButton>
      </div>
    `
  })
}

// Icon-only Loading State
export const IconOnlyLoading: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    prefixIcon: 'add'
  },
  render: (args) => ({
    components: { GlimButton },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <GlimButton v-bind="args" :prefixIcon="args.prefixIcon" :suffixIcon="undefined"></GlimButton>
        <GlimButton v-bind="args" :prefixIcon="args.prefixIcon" :suffixIcon="undefined" :loading="true"></GlimButton>
        <GlimButton v-bind="args" :prefixIcon="args.prefixIcon" :suffixIcon="undefined" variant="secondary" :loading="true"></GlimButton>
        <GlimButton v-bind="args" :prefixIcon="args.prefixIcon" :suffixIcon="undefined" variant="tertiary" :loading="true"></GlimButton>
        <GlimButton v-bind="args" :prefixIcon="args.prefixIcon" :suffixIcon="undefined" variant="danger" :loading="true"></GlimButton>
      </div>
    `
  })
}

// Form Button Types
export const ButtonTypes: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
  render: (args) => ({
    components: { GlimButton },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <GlimButton v-bind="args" type="button">Button Type</GlimButton>
        <GlimButton v-bind="args" type="submit">Submit Type</GlimButton>
        <GlimButton v-bind="args" type="reset">Reset Type</GlimButton>
      </div>
    `
  })
}
