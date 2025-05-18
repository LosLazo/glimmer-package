import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ProgressBar from '../ProgressBar/ProgressBar.vue'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    progress: { 
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    looping: { control: 'boolean' }
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

// Default ProgressBar
export const Default: Story = {
  args: {
    progress: 50,
    looping: false
  }
}

// Progress States
export const ProgressStates: Story = {
  render: (args) => ({
    components: { ProgressBar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 8px;">No Progress (0%)</div>
          <ProgressBar v-bind="args" :progress="0" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Partial Progress (25%)</div>
          <ProgressBar v-bind="args" :progress="25" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Half Progress (50%)</div>
          <ProgressBar v-bind="args" :progress="50" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Almost Complete (75%)</div>
          <ProgressBar v-bind="args" :progress="75" />
        </div>
        <div>
          <div style="margin-bottom: 8px;">Complete (100%)</div>
          <ProgressBar v-bind="args" :progress="100" />
        </div>
      </div>
    `
  }),
  args: {
    looping: false
  }
}

// Looping ProgressBar
export const Looping: Story = {
  args: {
    looping: true
  }
}

// Interactive Demo
export const Interactive: Story = {
  render: () => ({
    components: { ProgressBar },
    setup() {
      const progress = ref(0)
      const isRunning = ref(false)
      const isLooping = ref(false)
      
      const startProgress = () => {
        if (isRunning.value) return
        
        isRunning.value = true
        progress.value = 0
        
        const interval = setInterval(() => {
          progress.value += 1
          
          if (progress.value >= 100) {
            clearInterval(interval)
            isRunning.value = false
          }
        }, 50)
      }
      
      const resetProgress = () => {
        progress.value = 0
        isRunning.value = false
      }
      
      const toggleLooping = () => {
        isLooping.value = !isLooping.value
      }
      
      return { 
        progress, 
        isLooping, 
        startProgress, 
        resetProgress,
        toggleLooping
      }
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <ProgressBar :progress="progress" :looping="isLooping" />
        </div>
        <div style="display: flex; gap: 8px;">
          <button @click="startProgress" style="padding: 8px 16px;">Start</button>
          <button @click="resetProgress" style="padding: 8px 16px;">Reset</button>
          <button @click="toggleLooping" style="padding: 8px 16px;">
            {{ isLooping ? 'Show Progress' : 'Show Looping' }}
          </button>
        </div>
        <div style="margin-top: 16px;">
          Progress: {{ progress }}%
        </div>
      </div>
    `
  })
} 