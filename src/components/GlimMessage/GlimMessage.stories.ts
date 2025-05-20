import type { Meta, StoryObj } from '@storybook/vue3'
import GlimMessage from './GlimMessage.vue'

const meta = {
  title: 'Components/GlimMessage',
  component: GlimMessage,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    variant: { 
      control: 'select', 
      options: ['info', 'success', 'warning', 'error']
    }
  },
} satisfies Meta<typeof GlimMessage>

export default meta
type Story = StoryObj<typeof meta>

// Info Message
export const Info: Story = {
  args: {
    title: 'Information',
    description: 'This is an informational message that provides helpful details to the user.',
    variant: 'info'
  }
}

// Success Message
export const Success: Story = {
  args: {
    title: 'Success',
    description: 'The operation completed successfully. Your changes have been saved.',
    variant: 'success'
  }
}

// Warning Message
export const Warning: Story = {
  args: {
    title: 'Warning',
    description: 'Please review your information before proceeding. Some fields may require attention.',
    variant: 'warning'
  }
}

// Error Message
export const Error: Story = {
  args: {
    title: 'Error',
    description: 'An error occurred while processing your request. Please try again later.',
    variant: 'error'
  }
}

// All Variants
export const AllVariants: Story = {
  render: (args) => ({
    components: { GlimMessage },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <GlimMessage 
          title="Information Message" 
          description="This is an informational message that provides helpful details to the user."
          variant="info"
        />
        <GlimMessage 
          title="Success Message" 
          description="The operation completed successfully. Your changes have been saved."
          variant="success"
        />
        <GlimMessage 
          title="Warning Message" 
          description="Please review your information before proceeding. Some fields may require attention."
          variant="warning"
        />
        <GlimMessage 
          title="Error Message" 
          description="An error occurred while processing your request. Please try again later."
          variant="error"
        />
      </div>
    `
  }),
  args: {
    title: 'Message Title',
    description: 'Message content goes here'
  }
} 