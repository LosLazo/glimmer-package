import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimCard, GlimButton } from '../../../src'

const meta = {
  title: 'Components/Card',
  component: GlimCard,
  tags: ['autodocs'],
  argTypes: {
    headerText: { control: 'text' },
    title: { control: 'text' },
    text: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    imageAspectRatio: { 
      control: 'select', 
      options: ['1x1', '16x9', '4x3', '4x5', '3x2', '5x4']
    },
    imageOrientation: { 
      control: 'select', 
      options: ['landscape', 'portrait']
    },
    href: { control: 'text' },
    width: { control: 'text' }
  },
} satisfies Meta<typeof GlimCard>

export default meta
type Story = StoryObj<typeof meta>

// Default Card with all default properties
export const Default: Story = {
  args: {
    headerText: 'Header text',
    title: 'Title',
    text: 'Text',
    imageSrc: 'https://cdn.cosmos.so/962784fe-d06b-4f23-84e5-f0a1efd3a6d6.?format=jpeg',
    imageAlt: 'Image Alt',
    imageAspectRatio: '4x3',
    imageOrientation: 'landscape',
    href: '',
    width: 'auto'
  }
}

// Basic Card
export const Basic: Story = {
  args: {
    title: 'Card Title',
    text: 'This is a card description that can contain information about this content.'
  }
}

// Card with Image
export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    text: 'This card includes an image at the top.',
    imageSrc: 'https://picsum.photos/id/1015/600/400',
    imageAlt: 'A scenic mountain landscape',
    imageAspectRatio: '16x9',
    imageOrientation: 'landscape'
  }
}

// Card with Header
export const WithHeader: Story = {
  args: {
    headerText: 'Featured',
    title: 'Card with Header',
    text: 'This card includes a header element above the title.'
  }
}

// Card as Link
export const AsLink: Story = {
  args: {
    title: 'Clickable Card',
    text: 'This entire card is clickable and acts as a link.',
    href: 'https://example.com'
  }
}

// Card with Actions
export const WithActions: Story = {
  render: (args) => ({
    components: { GlimCard, GlimButton },
    setup() {
      return { args }
    },
    template: `
      <GlimCard
        v-bind="args"
        title="Card with Actions"
        text="This card has action buttons in the slot at the bottom."
      >
        <template #actions>
          <GlimButton variant="primary" size="small">Action</GlimButton>
          <GlimButton variant="secondary" size="small">Cancel</GlimButton>
        </template>
      </GlimCard>
    `
  })
}

// Card Variants
export const CardVariants: Story = {
  render: (args) => ({
    components: { GlimCard },
    setup() {
      return { args }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        <GlimCard 
          v-bind="args" 
          title="Basic Card" 
          text="A simple card with just text content."
        />
        <GlimCard 
          v-bind="args" 
          headerText="Featured"
          title="Card with Header" 
          text="A card with a header above the title."
        />
        <GlimCard 
          v-bind="args" 
          title="Card with Image" 
          text="A card with an image at the top."
          imageSrc="https://picsum.photos/id/1018/600/400"
          imageAlt="A scenic forest landscape"
          imageAspectRatio="16x9"
        />
        <GlimCard 
          v-bind="args" 
          title="Wide Card" 
          text="This card spans the width of two columns."
          width="span 2"
        />
      </div>
    `
  })
} 