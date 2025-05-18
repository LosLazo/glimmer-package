import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimIcon } from '../../../src'

const meta = {
  title: 'Components/Icon',
  component: GlimIcon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    size: { control: 'number' },
    color: { 
      control: 'select',
      options: ['currentColor', 'strong', 'defined', 'soft', 'disabled', 'discrete'],
      description: 'Color variant of the icon'
    }
  },
} as Meta<typeof GlimIcon>

export default meta
type Story = StoryObj<typeof meta>

// Default Icon
export const Default: Story = {
  args: {
    name: 'star',
    size: 24,
    color: 'currentColor'
  }
}

// Common Icons
export const CommonIcons: Story = {
  render: (args) => ({
    components: { GlimIcon },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" name="home" />
          <span>home</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" name="user" />
          <span>user</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" name="settings" />
          <span>settings</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" name="search" />
          <span>search</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" name="heart" />
          <span>heart</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" name="mail" />
          <span>mail</span>
        </div>
      </div>
    `
  }),
  args: {
    name: 'star',
    size: 24,
    color: 'currentColor'
  }
}

// Different Sizes
export const Sizes: Story = {
  render: (args) => ({
    components: { GlimIcon },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" size="16" name="star" />
          <span>16px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" size="24" name="star" />
          <span>24px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" size="32" name="star" />
          <span>32px</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" size="48" name="star" />
          <span>48px</span>
        </div>
      </div>
    `
  }),
  args: {
    name: 'star',
    color: 'currentColor'
  }
}

// Different Colors
export const Colors: Story = {
  render: (args) => ({
    components: { GlimIcon },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 24px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" color="currentColor" name="star" />
          <span>Current Color</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" color="strong" name="star" />
          <span>Strong</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" color="defined" name="star" />
          <span>Defined</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" color="soft" name="star" />
          <span>Soft</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" color="disabled" name="star" />
          <span>Disabled</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <GlimIcon v-bind="args" color="discrete" name="star" />
          <span>Discrete</span>
        </div>
      </div>
    `
  }),
  args: {
    name: 'star',
    size: 24
  }
} 