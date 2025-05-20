import type { Meta, StoryObj } from '@storybook/vue3'
import { GlimImage } from '../../../src'

const meta = {
  title: 'Components/GlimImage',
  component: GlimImage,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    aspectRatio: { 
      control: 'select', 
      options: ['1x1', '16x9', '4x3', '4x5', '3x2', '5x4']
    },
    orientation: { 
      control: 'select', 
      options: ['landscape', 'portrait']
    },
    backgroundColor: { control: 'color' }
  },
} as Meta<typeof GlimImage>

export default meta
type Story = StoryObj<typeof meta>

// Default Image
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/id/1018/800/600',
    alt: 'A beautiful mountain landscape',
    aspectRatio: '16x9',
    orientation: 'landscape'
  }
}

// Different Aspect Ratios
export const AspectRatios: Story = {
  render: (args) => ({
    components: { GlimImage },
    setup() {
      return { args }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">1:1 Square</h3>
          <GlimImage v-bind="args" aspectRatio="1x1" />
        </div>
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">16:9 Widescreen</h3>
          <GlimImage v-bind="args" aspectRatio="16x9" />
        </div>
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">4:3 Standard</h3>
          <GlimImage v-bind="args" aspectRatio="4x3" />
        </div>
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">3:2 Classic</h3>
          <GlimImage v-bind="args" aspectRatio="3x2" />
        </div>
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">4:5 Portrait</h3>
          <GlimImage v-bind="args" aspectRatio="4x5" />
        </div>
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">5:4 Medium Format</h3>
          <GlimImage v-bind="args" aspectRatio="5x4" />
        </div>
      </div>
    `
  }),
  args: {
    src: 'https://picsum.photos/id/1015/800/600',
    alt: 'Sample image with different aspect ratios'
  }
}

// Portrait Orientation
export const Portrait: Story = {
  args: {
    src: 'https://picsum.photos/id/1027/800/1200',
    alt: 'Portrait image',
    aspectRatio: '4x5',
    orientation: 'portrait'
  }
}

// With Background Color (No Image)
export const BackgroundColor: Story = {
  args: {
    src: '',
    alt: '',
    aspectRatio: '16x9',
    backgroundColor: '#3498db'
  }
}

// Multiple Formats
export const MultipleFormats: Story = {
  render: (args) => ({
    components: { GlimImage },
    setup() {
      return { args }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">Landscape 16:9</h3>
          <GlimImage 
            v-bind="args" 
            src="https://picsum.photos/id/1015/800/450"
            alt="Landscape image"
            aspectRatio="16x9"
            orientation="landscape"
          />
        </div>
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">Portrait 4:5</h3>
          <GlimImage 
            v-bind="args" 
            src="https://picsum.photos/id/1027/400/500"
            alt="Portrait image"
            aspectRatio="4x5"
            orientation="portrait"
          />
        </div>
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">Square 1:1</h3>
          <GlimImage 
            v-bind="args" 
            src="https://picsum.photos/id/1025/500/500"
            alt="Square image"
            aspectRatio="1x1"
          />
        </div>
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px;">No Image (Background Color)</h3>
          <GlimImage 
            backgroundColor="#2ecc71"
            aspectRatio="1x1"
          />
        </div>
      </div>
    `
  }),
  args: {}
} 