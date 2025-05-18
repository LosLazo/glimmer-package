import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { GlimCheckbox } from '../../../src'  

const meta = {
  title: 'Components/Checkbox',
  component: GlimCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { 
      control: 'select', 
      options: ['small', 'default']
    },
    label: { control: 'text' },
    id: { control: 'text' }
  },
} as Meta<typeof GlimCheckbox>

export default meta
type Story = StoryObj<typeof meta>

// Default Story
export const Default: Story = {
  args: {
    modelValue: false
  },
  render: () => ({
    components: { GlimCheckbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: `
      <Checkbox v-model="checked" label="Default checkbox" />
      <div style="margin-top: 8px;">Checked: {{ checked }}</div>
    `
  })
}

// Checked Story
export const Checked: Story = {
  args: {
    modelValue: true
  },
  render: () => ({
    components: {GlimCheckbox },
    setup() {
      const checked = ref(true)
      return { checked }
    },
    template: `
      <Checkbox v-model="checked" label="Checked checkbox" />
      <div style="margin-top: 8px;">Checked: {{ checked }}</div>
    `
  })
}

// Disabled States Story
export const DisabledStates: Story = {
  args: {
    modelValue: false
  },
  render: () => ({
    components: { GlimCheckbox },
    setup() {
      const checkedDisabled = ref(true)
      const uncheckedDisabled = ref(false)
      return { checkedDisabled, uncheckedDisabled }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Checkbox v-model="uncheckedDisabled" label="Disabled unchecked" disabled />
        <Checkbox v-model="checkedDisabled" label="Disabled checked" disabled />
      </div>
    `
  })
}

// Sizes Story
export const Sizes: Story = {
  args: {
    modelValue: false
  },
  render: () => ({
    components: { GlimCheckbox },
    setup() {
      const defaultSize = ref(true)
      const smallSize = ref(true)
      return { defaultSize, smallSize }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Checkbox v-model="defaultSize" size="default" label="Default size" />
        <Checkbox v-model="smallSize" size="small" label="Small size" />
      </div>
    `
  })
}

// Without Label Story
export const WithoutLabel: Story = {
  args: {
    modelValue: false
  },
  render: () => ({
    components: { GlimCheckbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: `
      <Checkbox v-model="checked" />
    `
  })
}

// With ID Story
export const WithID: Story = {
  args: {
    modelValue: false,
    id: 'my-checkbox'
  },
  render: () => ({
    components: { GlimCheckbox },
    setup() {
      const checked = ref(false)
      return { checked }
    },
    template: `
      <Checkbox v-model="checked" id="my-checkbox" label="Checkbox with ID" />
      <div style="margin-top: 8px;">
        <button @click="checked = !checked">Toggle with external button (using ID)</button>
      </div>
    `
  })
}

// All Variants Story
export const AllVariants: Story = {
  args: {
    modelValue: false
  },
  render: () => ({
    components: { GlimCheckbox },
    setup() {
      const checked1 = ref(false)
      const checked2 = ref(true)
      const checked3 = ref(false)
      const checked4 = ref(true)
      const checked5 = ref(false)
      const checked6 = ref(true)
      
      return { 
        checked1, checked2, checked3, 
        checked4, checked5, checked6 
      }
    },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <Checkbox v-model="checked1" label="Unchecked" />
        <Checkbox v-model="checked2" label="Checked" />
        <Checkbox v-model="checked3" size="small" label="Small unchecked" />
        <Checkbox v-model="checked4" size="small" label="Small checked" />
        <Checkbox v-model="checked5" disabled label="Disabled unchecked" />
        <Checkbox v-model="checked6" disabled label="Disabled checked" />
      </div>
    `
  })
} 