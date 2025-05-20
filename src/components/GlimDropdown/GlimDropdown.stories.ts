import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { GlimDropdown } from '../../../src'

const meta = {
  title: 'Components/Dropdown',
  component: GlimDropdown,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    size: { 
      control: 'select', 
      options: ['large', 'medium', 'small']
    },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    success: { control: 'text' },
    prefixIcon: { control: 'text' },
    id: { control: 'text' },
    items: { control: 'object' },
    editable: { control: 'boolean' }
  },
} as Meta<typeof GlimDropdown>

export default meta
type Story = StoryObj<typeof meta>

const dropdownItems = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
]

// Default Dropdown
export const Default: Story = {
  render: () => ({
    components: { GlimDropdown },
    setup() {
      const selectedOption = ref('')
      return { selectedOption, dropdownItems }
    },
    template: `
      <GlimDropdown 
        v-model="selectedOption" 
        label="Select an option" 
        placeholder="Choose an option" 
        id="default-dropdown"
        :items="dropdownItems"
      />
    `
  }),
  args: {
    modelValue: '',
    id: 'default-dropdown',
    items: dropdownItems
  }
}

// Dropdown Sizes
export const Sizes: Story = {
  render: () => ({
    components: { GlimDropdown },
    setup() {
      const largeOption = ref('')
      const mediumOption = ref('')
      const smallOption = ref('')
      return { largeOption, mediumOption, smallOption, dropdownItems }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <GlimDropdown 
          v-model="largeOption" 
          label="Large Dropdown" 
          placeholder="Large size" 
          size="large" 
          id="large-dropdown"
          :items="dropdownItems"
        />
        <GlimDropdown 
          v-model="mediumOption" 
          label="Medium Dropdown" 
          placeholder="Medium size (default)" 
          size="medium" 
          id="medium-dropdown"
          :items="dropdownItems"
        />
        <GlimDropdown 
          v-model="smallOption" 
          label="Small Dropdown" 
          placeholder="Small size" 
          size="small" 
          id="small-dropdown"
          :items="dropdownItems"
        />
      </div>
    `
  }),
  args: {
    modelValue: '',
    id: 'size-dropdown',
    items: dropdownItems
  }
}

// Dropdown with Prefix Icon
export const WithIcon: Story = {
  render: () => ({
    components: { GlimDropdown },
    setup() {
      const selectedOption = ref('')
      return { selectedOption, dropdownItems }
    },
    template: `
      <GlimDropdown 
        v-model="selectedOption" 
        label="Dropdown with Icon" 
        placeholder="Select with icon" 
        prefixIcon="filter"
        id="icon-dropdown"
        :items="dropdownItems"
      />
    `
  }),
  args: {
    modelValue: '',
    id: 'icon-dropdown',
    items: dropdownItems,
    prefixIcon: 'filter'
  }
}

// Dropdown States
export const States: Story = {
  render: () => ({
    components: { GlimDropdown },
    setup() {
      const normal = ref('')
      const errorVal = ref('')
      const successVal = ref('')
      const disabled = ref('')
      const editable = ref('')
      return { normal, errorVal, successVal, disabled, editable, dropdownItems }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <GlimDropdown 
          v-model="normal" 
          label="Default" 
          placeholder="Normal state"
          id="normal-dropdown"
          :items="dropdownItems"
        />
        <GlimDropdown 
          v-model="errorVal" 
          label="Error State" 
          placeholder="Error state"
          error="This field contains an error"
          id="error-dropdown"
          :items="dropdownItems"
        />
        <GlimDropdown 
          v-model="successVal" 
          label="Success State" 
          placeholder="Success state"
          success="This value is valid"
          id="success-dropdown"
          :items="dropdownItems"
        />
        <GlimDropdown 
          v-model="disabled" 
          label="Disabled State" 
          placeholder="Disabled state"
          disabled
          id="disabled-dropdown"
          :items="dropdownItems"
        />
        <GlimDropdown 
          v-model="editable" 
          label="Editable Dropdown" 
          placeholder="Type or select"
          editable
          id="editable-dropdown"
          :items="dropdownItems"
        />
      </div>
    `
  }),
  args: {
    modelValue: '',
    id: 'state-dropdown',
    items: dropdownItems
  }
}

// Custom Items
export const CustomItems: Story = {
  render: () => ({
    components: { GlimDropdown },
    setup() {
      const selectedOption = ref('')
      const customItems = [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
        { label: 'Germany', value: 'de' },
        { label: 'France', value: 'fr' },
        { label: 'Japan', value: 'jp' },
      ]
      return { selectedOption, customItems }
    },
    template: `
      <GlimDropdown 
        v-model="selectedOption" 
        label="Select Country" 
        placeholder="Choose a country" 
        id="custom-dropdown"
        :items="customItems"
      />
    `
  }),
  args: {
    modelValue: '',
    id: 'custom-dropdown',
    items: [
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Canada', value: 'ca' },
      { label: 'Australia', value: 'au' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
      { label: 'Japan', value: 'jp' },
    ]
  }
} 