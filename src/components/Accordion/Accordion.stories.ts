import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimAccordion } from '../../../src'

const meta = {
  title: 'Components/Accordion',
  component: GlimAccordion,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of accordion items to display',
      table: {
        type: { summary: 'AccordionItem[]' },
        defaultValue: { summary: 'Default options' }
      }
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the accordion (can be pixels, grid span, etc.)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' }
      }
    }
  }
} as Meta<typeof GlimAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      {
        label: 'Getting Started',
        content: 'Welcome to our platform! This is a default accordion item that shows when no options are provided.'
      },
      {
        label: 'Features',
        content: 'Discover our amazing features and how they can help you achieve your goals.'
      },
      {
        label: 'Support',
        content: 'Need help? Our support team is here to assist you with any questions or concerns.'
      }
    ]
  }
}

export const WithMaxWidth: Story = {
  args: {
    options: [
      {
        label: 'Section 1',
        content: 'This is the content for section 1'
      },
      {
        label: 'Section 2',
        content: 'This is the content for section 2'
      }
    ],
    maxWidth: '600px'
  }
}

export const GridSpan: Story = {
  args: {
    options: [
      {
        label: 'Grid Section 1',
        content: 'This accordion spans 6 grid columns'
      },
      {
        label: 'Grid Section 2',
        content: 'This accordion also spans 6 grid columns'
      }
    ],
    maxWidth: 'span 6'
  }
} 