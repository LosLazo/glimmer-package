import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimBanner } from '../../../src'

/**
 * A banner component that displays information or notifications with different variants.
 * Can be dismissible and supports both a title and description.
 */
const meta = {
  title: 'Components/Banner',
  component: GlimBanner,
  tags: ['autodocs'],
  argTypes: {
    title: { 
      control: 'text',
      description: 'Title text of the banner'
    },
    description: { 
      control: 'text',
      description: 'Description text of the banner'
    },
    variant: { 
      control: 'select', 
      options: ['default', 'info'],
      description: 'Visual style variant of the banner'
    },
    dismissable: { 
      control: 'boolean',
      description: 'Whether the banner can be dismissed'
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Event emitted when the dismiss button is clicked'
    }
  },
} satisfies Meta<typeof GlimBanner>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    variant: 'default',
    dismissable: false
  }
}

// Info Variant Story
export const Info: Story = {
  args: {
    title: 'Info Banner',
    description: 'This is an info banner message',
    variant: 'info',
    dismissable: false
  }
}

// Dismissable Story
export const Dismissable: Story = {
  args: {
    title: 'Important Notice',
    description: 'This banner can be dismissed',
    variant: 'default',
    dismissable: true
  }
}

// Title Only Story
export const TitleOnly: Story = {
  args: {
    title: 'Title Only Banner',
    description: '',
    variant: 'default',
    dismissable: false
  }
}

// Description Only Story
export const DescriptionOnly: Story = {
  args: {
    title: '',
    description: 'This banner only has a description',
    variant: 'default',
    dismissable: false
  }
}

// All Variants Story
export const AllVariants: Story = {
  render: (args) => ({
    components: { GlimBanner },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <GlimBanner v-bind="args" title="Default Banner" description="This is a default banner message" variant="default" />
        <GlimBanner v-bind="args" title="Info Banner" description="This is an info banner message" variant="info" />
      </div>
    `
  })
} 