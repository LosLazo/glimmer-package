import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { GlimInput } from '../../../src'

const meta = {
  title: 'Components/Input',
  component: GlimInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { 
      control: 'select', 
      options: ['text', 'password', 'email', 'tel', 'number', 'search', 'url']
    },
    size: { 
      control: 'select', 
      options: ['large', 'medium', 'small']
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'text' },
    success: { control: 'text' },
    prefixIcon: { control: 'text' },
    suffixIcon: { control: 'text' },
    id: { control: 'text' },
    showClearButton: { control: 'boolean' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' }
  },
} as Meta<typeof GlimInput>

export default meta
type Story = StoryObj<typeof meta>

// Default Input
export const Default: Story = {
  render: () => ({
    components: { GlimInput },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <GlimInput 
        v-model="value" 
        label="Username" 
        placeholder="Enter your username" 
        id="default-input"
      />
    `
  }),
  args: {
    modelValue: '',
    id: 'default-input'
  }
}

// Input Sizes
export const Sizes: Story = {
  render: () => ({
    components: { GlimInput },
    setup() {
      const valueSmall = ref('')
      const valueMedium = ref('')
      const valueLarge = ref('')
      return { valueSmall, valueMedium, valueLarge }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <GlimInput 
          v-model="valueLarge" 
          label="Large Input" 
          placeholder="Large size" 
          size="large" 
          id="large-input"
        />
        <GlimInput 
          v-model="valueMedium" 
          label="Medium Input" 
          placeholder="Medium size (default)" 
          size="medium" 
          id="medium-input"
        />
        <GlimInput 
          v-model="valueSmall" 
          label="Small Input" 
          placeholder="Small size" 
          size="small" 
          id="small-input"
        />
      </div>
    `
  }),
  args: {
    modelValue: '',
    id: 'size-input'
  }
}

// Input with Icons
export const WithIcons: Story = {
  render: () => ({
    components: { GlimInput },
    setup() {
      const email = ref('')
      const search = ref('')
      const password = ref('')
      return { email, search, password }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <GlimInput 
          v-model="email" 
          label="Email" 
          placeholder="Enter your email" 
          type="email"
          prefixIcon="mail"
          id="email-input"
        />
        <GlimInput 
          v-model="search" 
          label="Search" 
          placeholder="Search..." 
          prefixIcon="search"
          showClearButton
          id="search-input"
        />
        <GlimInput 
          v-model="password" 
          label="Password" 
          placeholder="Enter your password" 
          type="password"
          prefixIcon="lock"
          id="password-input"
        />
      </div>
    `
  }),
  args: {
    modelValue: '',
    id: 'icon-input'
  }
}

// Input States
export const States: Story = {
  render: () => ({
    components: { GlimInput },
    setup() {
      const normal = ref('Regular input')
      const errorVal = ref('Invalid input')
      const successVal = ref('Valid input')
      const disabled = ref('Disabled input')
      const readonly = ref('Read-only input')
      return { normal, errorVal, successVal, disabled, readonly }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <GlimInput 
          v-model="normal" 
          label="Default" 
          id="normal-input"
        />
        <GlimInput 
          v-model="errorVal" 
          label="Error State" 
          error="This field contains an error"
          id="error-input"
        />
        <GlimInput 
          v-model="successVal" 
          label="Success State" 
          success="This value is valid"
          id="success-input"
        />
        <GlimInput 
          v-model="disabled" 
          label="Disabled State" 
          disabled
          id="disabled-input"
        />
        <GlimInput 
          v-model="readonly" 
          label="Read-only State" 
          readonly
          id="readonly-input"
        />
      </div>
    `
  }),
  args: {
    modelValue: '',
    id: 'state-input'
  }
}

// Input Types
export const Types: Story = {
  render: () => ({
    components: { GlimInput },
    setup() {
      const text = ref('')
      const password = ref('')
      const email = ref('')
      const number = ref('')
      return { text, password, email, number }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <GlimInput 
          v-model="text" 
          label="Text Input" 
          type="text"
          placeholder="Regular text input"
          id="text-input"
        />
        <GlimInput 
          v-model="password" 
          label="Password Input" 
          type="password"
          placeholder="Enter password"
          id="password-type-input"
        />
        <GlimInput 
          v-model="email" 
          label="Email Input" 
          type="email"
          placeholder="Enter email address"
          id="email-type-input"
        />
        <GlimInput 
          v-model="number" 
          label="Number Input" 
          type="number"
          placeholder="Enter a number"
          id="number-input"
        />
      </div>
    `
  }),
  args: {
    modelValue: '',
    id: 'type-input'
  }
}

// Input with Slots
export const WithSlots: Story = {
  render: () => ({
    components: { GlimInput },
    setup() {
      const value = ref('')
      const valueWithHint = ref('')
      const handleClear = () => {
        value.value = '';
      }
      return { value, valueWithHint, handleClear }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <GlimInput 
          v-model="value" 
          label="Input with Suffix Slot" 
          placeholder="Type something..." 
          id="suffix-slot-input"
        >
          <template #suffix>
            <button style="background: none; border: none; cursor: pointer; color: var(--glim-color-text-soft);" @click="handleClear">
              Clear
            </button>
          </template>
        </GlimInput>
        
        <GlimInput 
          v-model="valueWithHint" 
          label="Input with Hint Slot" 
          placeholder="Type something..." 
          id="hint-slot-input"
        >
          <template #hint>
            <span>This is a helpful hint about the input field</span>
          </template>
        </GlimInput>
      </div>
    `
  }),
  args: {
    modelValue: '',
    id: 'slot-input'
  }
}

// Input with Events
export const WithEvents: Story = {
  render: () => ({
    components: { GlimInput },
    setup() {
      const value = ref('')
      const eventLog = ref('Events will show here')
      
      const handleFocus = () => {
        eventLog.value = 'Input focused';
      }
      
      const handleBlur = () => {
        eventLog.value = 'Input blurred';
      }
      
      const handleInput = (newValue: string) => {
        eventLog.value = `Value changed to: ${newValue}`;
      }
      
      return { value, eventLog, handleFocus, handleBlur, handleInput }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <GlimInput 
          v-model="value" 
          label="Input with Events" 
          placeholder="Click in and out of this field..." 
          id="events-input"
          @focus="handleFocus"
          @blur="handleBlur"
          @update:modelValue="handleInput"
        />
        
        <div style="padding: 16px; background-color: var(--glim-color-elements-surface-secondary); border-radius: 4px;">
          <p>Event log: {{ eventLog }}</p>
        </div>
      </div>
    `
  }),
  args: {
    modelValue: '',
    id: 'events-input'
  }
} 