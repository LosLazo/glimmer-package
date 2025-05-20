import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimMenu } from '../../../src'

const meta = {
  title: 'Components/Menu',
  component: GlimMenu,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    onClick: { action: 'clicked' }
  },
} satisfies Meta<typeof GlimMenu>

export default meta
type Story = StoryObj<typeof meta>

// Default Menu with default props
export const Default: Story = {
  args: {
    items: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' }
    ]
  }
}

// Menu with Selected Item
export const WithSelectedItem: Story = {
  args: {
    items: [
      { label: 'Option 1' },
      { label: 'Option 2', selected: true },
      { label: 'Option 3' }
    ]
  }
}

// Menu with Many Items
export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({ 
      label: `Option ${i + 1}`,
      selected: i === 2
    }))
  }
}

// Menu with Long Labels
export const LongLabels: Story = {
  args: {
    items: [
      { label: 'This is a very long option that might need to wrap or truncate' },
      { label: 'Another long option example to test layout and styling' },
      { label: 'Short option', selected: true },
      { label: 'Yet another long menu item label to see how the component handles it' }
    ]
  }
} 