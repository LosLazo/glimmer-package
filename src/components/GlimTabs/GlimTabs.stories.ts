import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { GlimTabs } from '../../../src'

type TabsProps = InstanceType<typeof GlimTabs>['$props']

const meta = {
  title: 'Components/Tabs',
  component: GlimTabs,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    items: { control: 'object' }
  },
} as Meta<TabsProps>

export default meta
type Story = StoryObj<typeof meta>

// Default Tabs
export const Default: Story = {
  render: () => ({
    components: { GlimTabs },
    setup() {
      const activeTab = ref('tab1')
      const items = [
        { id: 'tab1', label: 'Profile' },
        { id: 'tab2', label: 'Settings' },
        { id: 'tab3', label: 'Notifications' }
      ]
      
      return { activeTab, items }
    },
    template: `
      <div>
        <GlimTabs v-model="activeTab" :items="items" />
        <div style="margin-top: 24px; padding: 16px; background-color: #f5f5f5; border-radius: 8px;">
          <div v-if="activeTab === 'tab1'">
            <h3 style="margin-top: 0;">Profile Content</h3>
            <p>This is the profile tab content.</p>
          </div>
          <div v-if="activeTab === 'tab2'">
            <h3 style="margin-top: 0;">Settings Content</h3>
            <p>This is the settings tab content.</p>
          </div>
          <div v-if="activeTab === 'tab3'">
            <h3 style="margin-top: 0;">Notifications Content</h3>
            <p>This is the notifications tab content.</p>
          </div>
        </div>
      </div>
    `
  }),
  args: {
    modelValue: 'tab1',
    items: [
      { id: 'tab1', label: 'Profile' },
      { id: 'tab2', label: 'Settings' },
      { id: 'tab3', label: 'Notifications' }
    ]
  }
}

// With Disabled Tab
export const WithDisabledTab: Story = {
  render: () => ({
    components: { GlimTabs },
    setup() {
      const activeTab = ref('tab1')
      const items = [
        { id: 'tab1', label: 'Overview' },
        { id: 'tab2', label: 'Details' },
        { id: 'tab3', label: 'Reviews', disabled: true },
        { id: 'tab4', label: 'Related' }
      ]
      
      return { activeTab, items }
    },
    template: `
      <div>
        <GlimTabs v-model="activeTab" :items="items" />
        <div style="margin-top: 16px;">
          Active tab: {{ activeTab }}
        </div>
      </div>
    `
  }),
  args: {
    modelValue: 'tab1',
    items: [
      { id: 'tab1', label: 'Overview' },
      { id: 'tab2', label: 'Details' },
      { id: 'tab3', label: 'Reviews', disabled: true },
      { id: 'tab4', label: 'Related' }
    ]
  }
}

// Many Tabs
export const ManyTabs: Story = {
  render: () => ({
    components: { GlimTabs },
    setup() {
      const activeTab = ref('tab1')
      const items = [
        { id: 'tab1', label: 'Home' },
        { id: 'tab2', label: 'Products' },
        { id: 'tab3', label: 'Services' },
        { id: 'tab4', label: 'About' },
        { id: 'tab5', label: 'Blog' },
        { id: 'tab6', label: 'Contact' },
        { id: 'tab7', label: 'Support' }
      ]
      
      return { activeTab, items }
    },
    template: `
      <div>
        <GlimTabs v-model="activeTab" :items="items" />
        <div style="margin-top: 16px;">
          Active tab: {{ activeTab }}
        </div>
      </div>
    `
  }),
  args: {
    modelValue: 'tab1',
    items: [
      { id: 'tab1', label: 'Home' },
      { id: 'tab2', label: 'Products' },
      { id: 'tab3', label: 'Services' },
      { id: 'tab4', label: 'About' },
      { id: 'tab5', label: 'Blog' },
      { id: 'tab6', label: 'Contact' },
      { id: 'tab7', label: 'Support' }
    ]
  }
}

// Numeric IDs
export const NumericIDs: Story = {
  render: () => ({
    components: { GlimTabs },
    setup() {
      const activeTab = ref(1)
      const items = [
        { id: 1, label: 'First' },
        { id: 2, label: 'Second' },
        { id: 3, label: 'Third' }
      ]
      
      return { activeTab, items }
    },
    template: `
      <div>
        <GlimTabs v-model="activeTab" :items="items" />
        <div style="margin-top: 16px;">
          Active tab ID: {{ activeTab }} (numeric)
        </div>
      </div>
    `
  }),
  args: {
    modelValue: 1,
    items: [
      { id: 1, label: 'First' },
      { id: 2, label: 'Second' },
      { id: 3, label: 'Third' }
    ]
  }
} 