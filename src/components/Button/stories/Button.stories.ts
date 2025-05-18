import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => ({
    template: '<button>Button Story</button>',
  }),
}; 