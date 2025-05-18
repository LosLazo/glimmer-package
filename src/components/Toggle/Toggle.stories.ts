import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { GlimToggle } from '../../../src'

const meta = {
  title: 'Components/Toggle',
  component: GlimToggle,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { 
      control: 'select', 
      options: ['small', 'default']
    }
  },
} as Meta<typeof GlimToggle>

export default meta
type Story = StoryObj<typeof meta>

// Default Toggle
export const Default: Story = {
  render: () => ({
    components: { GlimToggle },
    setup() {
      const value = ref(false)
      return { value }
    },
    template: `
      <div>
        <GlimToggle v-model="value" />
        <div style="margin-top: 8px;">Value: {{ value ? 'On' : 'Off' }}</div>
      </div>
    `
  }),
  args: {
    modelValue: false
  }
}

// Toggle States
export const States: Story = {
  render: () => ({
    components: { GlimToggle },
    setup() {
      const offValue = ref(false)
      const onValue = ref(true)
      const disabledOff = ref(false)
      const disabledOn = ref(true)
      
      return { 
        offValue, 
        onValue, 
        disabledOff, 
        disabledOn 
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <GlimToggle v-model="offValue" />
          <span>Off State</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <GlimToggle v-model="onValue" />
          <span>On State</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <GlimToggle v-model="disabledOff" disabled />
          <span>Disabled Off</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <GlimToggle v-model="disabledOn" disabled />
          <span>Disabled On</span>
        </div>
      </div>
    `
  }),
  args: {
    modelValue: false
  }
}

// Toggle Sizes
export const Sizes: Story = {
  render: () => ({
    components: { GlimToggle },
    setup() {
      const defaultSize = ref(true)
      const smallSize = ref(true)
      
      return { defaultSize, smallSize }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <GlimToggle v-model="defaultSize" size="default" />
          <span>Default Size</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <GlimToggle v-model="smallSize" size="small" />
          <span>Small Size</span>
        </div>
      </div>
    `
  }),
  args: {
    modelValue: true
  }
}

// In Context
export const InContext: Story = {
  render: () => ({
    components: { GlimToggle },
    setup() {
      const darkMode = ref(false)
      const notifications = ref(true)
      const soundEnabled = ref(true)
      const autoSave = ref(false)
      
      return { 
        darkMode, 
        notifications, 
        soundEnabled, 
        autoSave 
      }
    },
    template: `
      <div style="max-width: 400px; padding: 24px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h3 style="margin-top: 0; margin-bottom: 24px; font-size: 18px;">Settings</h3>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 500;">Dark Mode</div>
              <div style="font-size: 14px; color: #666;">Enable dark theme</div>
            </div>
            <GlimToggle v-model="darkMode" />
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 500;">Notifications</div>
              <div style="font-size: 14px; color: #666;">Receive notifications</div>
            </div>
            <GlimToggle v-model="notifications" />
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 500;">Sound Effects</div>
              <div style="font-size: 14px; color: #666;">Enable sound effects</div>
            </div>
            <GlimToggle v-model="soundEnabled" />
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 500;">Auto-Save</div>
              <div style="font-size: 14px; color: #666;">Save changes automatically</div>
            </div>
            <GlimToggle v-model="autoSave" />
          </div>
        </div>
      </div>
    `
  }),
  args: {
    modelValue: false
  }
} 