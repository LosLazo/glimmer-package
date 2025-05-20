import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { GlimTooltip, GlimButton } from '../../../src'

const meta = {
  title: 'Components/GlimTooltip',
  component: GlimTooltip,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    position: { 
      control: 'select', 
      options: ['top', 'right', 'bottom', 'left']
    },
    visible: { control: 'boolean' }
  },
} as Meta<typeof GlimTooltip>

export default meta
type Story = StoryObj<typeof meta>

// Default Tooltip
export const Default: Story = {
  render: (args) => ({
    components: { GlimTooltip, GlimButton },
    setup() {
      const visible = ref(true)
      
      return { args, visible }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center; align-items: center; position: relative;">
        <GlimButton variant="primary">Hover me</GlimButton>
        <GlimTooltip 
          v-bind="args" 
          :visible="true"
          style="position: absolute; top: 70px; left: 50%;"
        />
      </div>
    `
  }),
  args: {
    text: 'This is a tooltip',
    position: 'top',
    visible: true
  }
}

// Tooltip Positions
export const Positions: Story = {
  render: (args) => ({
    components: { GlimTooltip, GlimButton },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 300px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; gap: 10px; position: relative;">
        <div></div>
        <div style="position: relative; display: flex; justify-content: center; align-items: center;">
          <GlimButton variant="primary">Top</GlimButton>
          <GlimTooltip 
            v-bind="args" 
            text="Top tooltip" 
            position="top" 
            :visible="true"
            style="position: absolute; top: -10px; left: 50%; transform: translate(-50%, -100%);"
          />
        </div>
        <div></div>
        
        <div style="position: relative; display: flex; justify-content: center; align-items: center;">
          <GlimButton variant="primary">Left</GlimButton>
          <GlimTooltip 
            v-bind="args" 
            text="Left tooltip" 
            position="left" 
            :visible="true"
            style="position: absolute; top: 50%; left: -10px; transform: translate(-100%, -50%);"
          />
        </div>
        <div></div>
        <div style="position: relative; display: flex; justify-content: center; align-items: center;">
          <GlimButton variant="primary">Right</GlimButton>
          <GlimTooltip 
            v-bind="args" 
            text="Right tooltip" 
            position="right" 
            :visible="true"
            style="position: absolute; top: 50%; right: -10px; transform: translate(100%, -50%);"
          />
        </div>
        
        <div></div>
        <div style="position: relative; display: flex; justify-content: center; align-items: center;">
          <GlimButton variant="primary">Bottom</GlimButton>
          <GlimTooltip 
            v-bind="args" 
            text="Bottom tooltip" 
            position="bottom" 
            :visible="true"
            style="position: absolute; bottom: -10px; left: 50%; transform: translate(-50%, 100%);"
          />
        </div>
        <div></div>
      </div>
    `
  }),
  args: {
    visible: true
  }
}

// Custom Content
export const CustomContent: Story = {
  render: (args) => ({
    components: { GlimTooltip, GlimButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center; align-items: center; position: relative;">
        <GlimButton variant="primary">Help</GlimButton>
        <GlimTooltip 
          v-bind="args" 
          :visible="true"
          style="position: absolute; top: 70px; left: 50%;"
        >
          <div>
            <strong>Need help?</strong>
            <p style="margin: 5px 0 0 0;">This feature allows you to <em>customize</em> your settings.</p>
            <ul style="margin: 5px 0 0 0; padding-left: 20px;">
              <li>Easy to use</li>
              <li>Customizable</li>
              <li>Responsive</li>
            </ul>
          </div>
        </GlimTooltip>
      </div>
    `
  }),
  args: {
    position: 'top',
    visible: true
  }
}

// Interactive Demo
export const Interactive: Story = {
  render: (args) => ({
    components: { GlimTooltip, GlimButton },
    setup() {
      const visible = ref(false)
      
      const showTooltip = () => {
        visible.value = true
      }
      
      const hideTooltip = () => {
        visible.value = false
      }
      
      return { args, visible, showTooltip, hideTooltip }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center; align-items: center; position: relative;">
        <GlimButton 
          variant="primary"
          @mouseenter="showTooltip"
          @mouseleave="hideTooltip"
          @focus="showTooltip"
          @blur="hideTooltip"
        >
          Hover or Focus Me
        </GlimButton>
        <GlimTooltip 
          v-bind="args" 
          text="This tooltip appears on hover or focus"
          :visible="visible"
          style="position: absolute; top: 70px; left: 50%;"
        />
      </div>
    `
  }),
  args: {
    position: 'top'
  }
} 