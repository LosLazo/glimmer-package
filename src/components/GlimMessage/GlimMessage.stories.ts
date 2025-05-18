import type { Meta, StoryObj } from '@storybook/vue3'
import Message from '../Message/Message.vue'

const meta = {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    variant: { 
      control: 'select', 
      options: ['info', 'success', 'warning', 'error']
    }
  },
} satisfies Meta<typeof Message>

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
    components: { Message },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Message 
          title="Information Message" 
          description="This is an informational message that provides helpful details to the user."
          variant="info"
        />
        <Message 
          title="Success Message" 
          description="The operation completed successfully. Your changes have been saved."
          variant="success"
        />
        <Message 
          title="Warning Message" 
          description="Please review your information before proceeding. Some fields may require attention."
          variant="warning"
        />
        <Message 
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