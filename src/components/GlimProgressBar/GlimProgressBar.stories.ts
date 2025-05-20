import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import GlimProgressBar from './GlimProgressBar.vue'

const meta = {
  title: 'Components/GlimProgressBar',
  component: GlimProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { 
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    indeterminate: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    height: { control: 'text' }
  },
} satisfies Meta<typeof GlimProgressBar>

export default meta
type Story = StoryObj<typeof meta>

// Default GlimProgressBar
export const Default: Story = {
  args: {
    value: 50,
    indeterminate: false
  }
}

// Progress States
export const ProgressStates: Story = {
  render: (args) => ({
    components: { GlimProgressBar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 8px;">No Progress (0%)</div>
          <GlimProgressBar v-bind="args" :value="0" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Partial Progress (25%)</div>
          <GlimProgressBar v-bind="args" :value="25" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Half Progress (50%)</div>
          <GlimProgressBar v-bind="args" :value="50" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Almost Complete (75%)</div>
          <GlimProgressBar v-bind="args" :value="75" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Complete (100%)</div>
          <GlimProgressBar v-bind="args" :value="100" />
        </div>
      </div>
    `
  }),
  args: {
    indeterminate: false
  }
}

// Sizes
export const Sizes: Story = {
  render: (args) => ({
    components: { GlimProgressBar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 8px;">Small</div>
          <GlimProgressBar v-bind="args" size="small" height="4px" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Medium (Default)</div>
          <GlimProgressBar v-bind="args" size="medium" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Large</div>
          <GlimProgressBar v-bind="args" size="large" height="12px" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Custom Height</div>
          <GlimProgressBar v-bind="args" height="16px" />
        </div>
      </div>
    `
  }),
  args: {
    value: 50,
    indeterminate: false
  }
}

// Indeterminate GlimProgressBar
export const Indeterminate: Story = {
  args: {
    indeterminate: true
  }
}

// Interactive Demo
export const Interactive: Story = {
  render: () => ({
    components: { GlimProgressBar },
    setup() {
      const progressValue = ref(0)
      const isRunning = ref(false)
      const isIndeterminate = ref(false)
      
      const startProgress = () => {
        if (isRunning.value) return
        
        isRunning.value = true
        progressValue.value = 0
        
        const interval = setInterval(() => {
          progressValue.value += 1
          
          if (progressValue.value >= 100) {
            clearInterval(interval)
            isRunning.value = false
          }
        }, 50)
      }
      
      const resetProgress = () => {
        progressValue.value = 0
        isRunning.value = false
      }
      
      const toggleIndeterminate = () => {
        isIndeterminate.value = !isIndeterminate.value
      }
      
      return { 
        progressValue, 
        isIndeterminate, 
        startProgress, 
        resetProgress,
        toggleIndeterminate
      }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <GlimProgressBar :value="progressValue" :indeterminate="isIndeterminate" />
        </div>
        <div style="display: flex; gap: 8px;">
          <button @click="startProgress" style="padding: 8px 16px;">Start</button>
          <button @click="resetProgress" style="padding: 8px 16px;">Reset</button>
          <button @click="toggleIndeterminate" style="padding: 8px 16px;">
            {{ isIndeterminate ? 'Show Progress' : 'Show Indeterminate' }}
          </button>
        </div>
        <div style="margin-top: 16px;">
          Progress: {{ progressValue }}%
        </div>
      </div>
    `
  })
} 