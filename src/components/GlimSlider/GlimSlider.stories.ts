import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { GlimSlider } from '../../../src'

/**
 * An interactive slider component for selecting a value within a range.
 * Features a draggable thumb, visual track/rail, and tooltip showing the current value.
 */
const meta = {
  title: 'Components/Slider',
  component: GlimSlider,
  tags: ['autodocs'],
  argTypes: {
    progress: { 
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The current value of the slider'
    },
    min: { 
      control: 'number',
      description: 'The minimum allowed value'
    },
    max: { 
      control: 'number',
      description: 'The maximum allowed value'
    },
    step: { 
      control: 'number',
      description: 'The step increment value'
    },
    isDisabled: { 
      control: 'boolean',
      description: 'Whether the slider is disabled'
    },
    'update:progress': {
      description: 'Emitted continuously as the slider value changes',
      action: 'update:progress'
    },
    'change': {
      description: 'Emitted when the user stops dragging the slider',
      action: 'change'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'An interactive slider component for selecting a value within a range. Features a draggable thumb, visual track/rail, and tooltip showing the current value.'
      }
    }
  }
} as Meta<typeof GlimSlider>

export default meta
type Story = StoryObj<typeof meta>

// Default Slider
export const Default: Story = {
  render: (args) => ({
    components: { GlimSlider },
    setup() {
      const sliderValue = ref(50)
      return { args, sliderValue }
    },
    template: `
      <div style="padding: 30px; width: 300px;">
        <GlimSlider 
          v-model:progress="sliderValue"
          :min="args.min"
          :max="args.max"
          :step="args.step"
          :isDisabled="args.isDisabled"
        />
        <div style="margin-top: 20px;">Current value: {{ sliderValue }}</div>
      </div>
    `
  }),
  args: {
    progress: 50,
    min: 0,
    max: 100,
    step: 1,
    isDisabled: false
  }
}

// Range Examples
export const Ranges: Story = {
  render: () => ({
    components: { GlimSlider },
    setup() {
      const percentValue = ref(75)
      const customRangeValue = ref(5)
      const decimalValue = ref(0.5)
      
      return { percentValue, customRangeValue, decimalValue }
    },
    template: `
      <div style="padding: 30px; display: flex; flex-direction: column; gap: 40px; width: 300px;">
        <div>
          <h3 style="margin-bottom: 10px;">Percentage (0-100)</h3>
          <GlimSlider v-model:progress="percentValue" :min="0" :max="100" :step="1" />
          <div style="margin-top: 10px;">Value: {{ percentValue }}%</div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 10px;">Custom Range (0-10)</h3>
          <GlimSlider v-model:progress="customRangeValue" :min="0" :max="10" :step="1" />
          <div style="margin-top: 10px;">Value: {{ customRangeValue }}</div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 10px;">Decimals (0-1)</h3>
          <GlimSlider v-model:progress="decimalValue" :min="0" :max="1" :step="0.1" />
          <div style="margin-top: 10px;">Value: {{ decimalValue.toFixed(1) }}</div>
        </div>
      </div>
    `
  }),
  args: {
    progress: 75,
    min: 0,
    max: 100,
    step: 1,
    isDisabled: false
  }
}

// Disabled Slider
export const Disabled: Story = {
  render: () => ({
    components: { GlimSlider },
    setup() {
      const enabledValue = ref(30)
      const disabledValue = ref(30)
      return { enabledValue, disabledValue }
    },
    template: `
      <div style="padding: 30px; display: flex; flex-direction: column; gap: 40px; width: 300px;">
        <div>
          <h3 style="margin-bottom: 10px;">Enabled Slider</h3>
          <GlimSlider 
            v-model:progress="enabledValue"
            :min="0"
            :max="100"
            :step="1"
            :isDisabled="false"
          />
          <div style="margin-top: 10px;">Value: {{ enabledValue }}</div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 10px;">Disabled Slider</h3>
          <GlimSlider 
            v-model:progress="disabledValue"
            :min="0"
            :max="100"
            :step="1"
            :isDisabled="true"
          />
          <div style="margin-top: 10px;">Value: {{ disabledValue }} (slider is disabled)</div>
        </div>
      </div>
    `
  }),
  args: {
    progress: 30,
    min: 0,
    max: 100,
    step: 1,
    isDisabled: true
  }
} 